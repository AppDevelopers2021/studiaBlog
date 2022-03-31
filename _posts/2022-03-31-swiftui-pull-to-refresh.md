---
title: SwiftUI 당겨서 새로고침 (Pull to Refresh)
description: 리스트와 스크롤뷰에서 Pull to Refresh을 사용하는 방법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/03/31
categories: ios
---

iOS 15부터 SwiftUI 앱에 당겨서 새로고침 (Pull to Refresh) 제스처를 넣는 것이 굉장히 간편해졌습니다. 이 글에서는 리스트에 당겨서 새로고침을 넣는 것 리스트 외의 뷰에서 당겨서 새로고침을 넣는 것을 알아보겠습니다.

## 리스트에서 당겨서 새로고침

다음과 같은 예시 앱이 있다고 하겠습니다. 

```swift
import SwiftUI

struct NumbersView: View {
    @State var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].shuffled()
    
    var body: some View {
        NavigationView {
            List(numbers, id: \.self) { number in
                Text(number)
            }
            .navigationTitle("My Awesome App")
        }
    }
}
```

1부터 10까지의 정수를 랜덤 순서로 출력하는 앱입니다. (numbers 뒤의 `shuffled()` 은 리스트를 섞어주는 역할을 합니다) 

여기서 Pull to Refresh을 적용하는 방법은 간단합니다. SwiftUI의 `.refreshable`을 사용하면 손쉽게 리스트에 당겨서 새로고침 기능을 넣을 수 있습니다.

```swift
List(numbers, id: \.self) { number in
    Text(number)
}
.refreshable {
    numbers.shuffle()
}
```

`.refreshable {` 뒤에 새로고침 시 실행할 코드를 입력하면 SwiftUI가 새로고침에 필요한 나머지 부분을 알아서 해결해줍니다. 생각보다 간단하게 해결됐습니다. 이런 식으로요.

<img style="max-width: 450px; display: block; margin: auto;" src="/assets/img/refreshable.gif">

## 만약 리스트가 아니라면

Pull to Refesh를 적용하려는 대상이 리스트가 아니라도 걱정하지 마세요. 다 방법이 있으니까요. 이번에는 위의 앱에서 리스트 대신 `ScrollView`를 사용해서 예로 들어 보겠습니다.

```swift
import SwiftUI

struct NumbersView: View {
    @State var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].shuffled()
    
    var body: some View {
        ScrollView {
            VStack {
                ForEach(numbers, id: \.self) { number in
                    Text(number)
                        .padding()
                }
            }
        }
    }
}
```

프로젝트에 `RefreshableScrollView.swift` 파일을 추가하고 다음을 입력합니다.

(다음 코드는 [SwiftUI Recipies](https://swiftuirecipes.com/blog/pull-to-refresh-with-swiftui-scrollview) 의 글을 참고하여 작성했음을 밝힙니다)

```swift
import SwiftUI

private enum PositionType {
    case fixed, moving
}

private struct Position: Equatable {
    let type: PositionType
    let y: CGFloat
}

private struct PositionPreferenceKey: PreferenceKey {
    typealias Value = [Position]
    static var defaultValue = [Position]()
    static func reduce(value: inout [Position], nextValue: () -> [Position]) {
        value.append(contentsOf: nextValue())
    }
}

private struct PositionIndicator: View {
    let type: PositionType
    
    var body: some View {
        GeometryReader { proxy in
            Color.clear
                .preference(key: PositionPreferenceKey.self, value: [Position(type: type, y: proxy.frame(in: .global).minY)])
        }
    }
}

typealias RefreshComplete = () -> Void
typealias OnRefresh = (@escaping RefreshComplete) -> Void
private let THRESHOLD: CGFloat = 50
private enum RefreshState {
    case waiting, primed, loading
}

struct RefreshableScrollView<Content: View>: View {
    let onRefresh: OnRefresh
    let content: Content
    
    @State private var state = RefreshState.waiting
    
    init(onRefresh: @escaping OnRefresh, @ViewBuilder content: () -> Content) {
        self.onRefresh = onRefresh
        self.content = content()
    }
    
    var body: some View {
        ScrollView {
            ZStack(alignment: .top) {
                PositionIndicator(type: .moving)
                    .frame(height: 0)
                
                content
                    .alignmentGuide(.top, computeValue: { _ in
                        (state == .loading) ? -THRESHOLD : 0
                    })
                
                ZStack {
                    Rectangle()
                        .foregroundColor(.white)
                        .frame(height: THRESHOLD)
                    
                    ActivityIndicator(isAnimating: state == .loading) {
                        $0.hidesWhenStopped = false
                    }
                    
                }.offset(y: (state == .loading) ? 0 : -THRESHOLD)
            }
        }
        .background(PositionIndicator(type: .fixed))
        .onPreferenceChange(PositionPreferenceKey.self) { values in
            if state != .loading {
                DispatchQueue.main.async {
                    let movingY = values.first { $0.type == .moving }?.y ?? 0
                    let fixedY = values.first { $0.type == .fixed }?.y ?? 0
                    let offset = movingY - fixedY
                    
                    if offset > THRESHOLD && state == .waiting {
                        state = .primed
                        
                    } else if offset < THRESHOLD && state == .primed {
                        state = .loading
                        onRefresh {
                            withAnimation {
                                self.state = .waiting
                            }
                        }
                    }
                }
            }
        }
    }
}

struct ActivityIndicator: UIViewRepresentable {
    public typealias UIView = UIActivityIndicatorView
    public var isAnimating: Bool = true
    public var configuration = { (indicator: UIView) in }
    
    public init(isAnimating: Bool, configuration: ((UIView) -> Void)? = nil) {
        self.isAnimating = isAnimating
        if let configuration = configuration {
            self.configuration = configuration
        }
    }
    
    public func makeUIView(context: UIViewRepresentableContext<Self>) -> UIView {
        UIView()
    }
    
    public func updateUIView(_ uiView: UIView, context: UIViewRepresentableContext<Self>) {
        isAnimating ? uiView.startAnimating() : uiView.stopAnimating()
        configuration(uiView)
    }
}
```

그런 다음 위의 ScrollView를 RefreshableScrollView로 바꾼 뒤 onRefresh 에 코드를 작성하면 됩니다.

```swift
import SwiftUI

struct NumbersView: View {
    @State var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].shuffled()
    
    var body: some View {
        RefreshableScrollView(onRefresh: { done in
            numbers.shuffle()
            done()
        }) {
            VStack {
                ForEach(numbers, id: \.self) { number in
                    Text(number)
                        .padding()
                }
            }
        }
    }
}
```

작업이 끝난 후에는 꼭 `done()`을 실행해 주세요. 이 함수를 실행해야 로딩 표시가 사라집니다.

<img style="max-width: 450px; display: block; margin: auto;" src="/assets/img/scrollview-refresh.gif">

이런 식으로 ScrollView에서도 Pull to Refresh를 사용할 수 있습니다.

## 마치며

이번 포스트에서는 SwiftUI에서 Pull To Refresh를 사용하는 방법 2가지 (*.refreshable* 방법과 커스텀 뷰를 사용하는 방법) 를 알아보았습니다. 이 글이 iOS 개발하시는 여러분들께 도움이 됐으면 좋겠네요. 모두 즐거운 코딩합시다!