![Dark Mode](/assets/img/darkmode.png)
요즘 다크 모드를 사용하는 사람들이 늘고 있습니다. 눈도 덜 아프고 배터리도 오래가기 때문이죠. 웹 사이트에도 다크 모드를 적용할 수 있습니다.

## 사용하는 방법
```css
@media (prefers-color-scheme: dark) {
    /* 다크 모드에서 적용되는 스타일 */
}
```
이렇게 하면 끝입니다. 이는 사용자의 시스템 설정을 반영하여 다크 모드를 활성화시킬 수 있습니다.



하나 팁을 드리자면
```css
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: black;
        --text-color: white;
    }
}
```
이런 식으로 `CSS Variable`을 사용하면 인생이 더 편해집니다. 나중에 색상을 바꾸기도 쉽고 말이죠.