# 홈페이지 업데이트

홈페이지: https://jacobyim.github.io/

GitHub에서 해당 파일을 열고 연필 아이콘으로 수정한 뒤 **Commit changes**를 누르면 GitHub Pages가 자동 게시합니다. 기존 항목을 복사해서 수정하면 됩니다. JSON의 쉼표와 따옴표에 유의하세요.

| 수정 내용 | 파일 |
| --- | --- |
| 소개, 이메일, GitHub, 관심 분야 | `_data/profile.json` |
| 논문 제목, 저자, 발표처, 설명, 링크 | `_data/research.json` |
| 프로젝트 설명, 기술, 결과 | `_data/projects.json` |
| 논문 이미지 업로드 | `assets/research/` |
| 디자인 | `assets/css/research-home.css` |
| 페이지 구성 | `index.html` |

## 논문 추가
`_data/research.json`의 항목 하나를 복사하여 배열 안에 추가합니다. `id`는 중복되지 않게, `image`는 `/assets/research/파일이름.png`로 지정합니다. 그림이 없으면 빈 문자열로 둡니다. `authors_html`에서 본인 이름을 `<b>Junghwan Yim</b>`으로 표시할 수 있습니다. `links`에 논문, 코드, 데모 링크를 추가합니다. 개인 기여나 실험 수치는 확인한 내용만 작성하세요.

## 프로젝트 추가
`_data/projects.json`에 날짜, 분야, 제목, 설명, 도구를 추가합니다. 결과 설명이 없으면 `details`와 `details_label`은 빈 문자열로 둡니다.

## 게시 확인 및 복구
저장소 Actions에서 Pages 작업이 초록색으로 완료되는지 확인한 뒤 사이트를 새로고침합니다. 실패하면 수정한 JSON 문법을 먼저 확인하세요. 잘못된 변경은 해당 커밋을 되돌려 복구할 수 있습니다.

기존 블로그 글은 보존되어 있으며 `/blog/`에서 글 목록을 볼 수 있습니다. 루트 주소를 중복 사용하던 테마 예시는 `/theme-demo/`로 이동했습니다. 제목이 없는 파일명 때문에 루트 `/`와 충돌하던 젠스크린 글은 `/asus-zenscreen-on-mac/`으로 이동했습니다. 나머지 글 주소는 유지했습니다. Sites 샘플은 별도 사본으로, GitHub 변경과 자동 동기화되지 않습니다.
