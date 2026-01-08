# rojs 요약

rojs 라이브러리의 주요 기능 요약입니다.

## 0. 설치 및 사용 (Installation & Usage)
`rojs`는 다양한 환경에서 유연하게 사용할 수 있도록 NPM 패키지와 CDN 방식을 모두 지원합니다.

### NPM (Node.js / Modern Bundlers)
Node.js 환경이나 Webpack, Rollup 등의 번들러를 사용하는 프로젝트에서는 NPM을 통해 설치할 수 있습니다.

```bash
npm install @mars-/ro
```

```javascript
import ro from '@mars-/ro';
// 또는
const ro = require('@mars-/ro');
```

### CDN (Browser Direct Usage)
별도의 빌드 과정 없이 HTML 파일 내에서 `<script>` 태그를 통해 직접 로드하여 사용할 수 있습니다.

```html
<!-- 예시 CDN 경로 -->
<script src="https://cdn.jsdelivr.net/npm/@mars-/ro/dist/ro.min.js"></script>
<script>
    // 전역 객체 'ro'가 window에 등록됩니다.
    ro.extend({ ... });
</script>
```

## 1. Core Utilities
*   **`ro.extend`**: jQuery의 `extend`와 동일한 기능을 제공합니다. 객체를 병합하거나 확장할 때 사용합니다.

## 2. Plugin System (플러그인 시스템)
`rojs`의 기능을 확장하고 관리하기 위한 시스템입니다.

### 2.1 플러그인 사용 (`ro.use`)
`ro.use` 메서드를 사용하여 플러그인을 설치합니다.

```javascript
// 1. install 메서드
ro.use({ install(ro) { ... } });

// 2. 함수형
ro.use(function(ro) { ... });

// 3. 자동 등록 (name + body)
ro.use({ name: 'myPlugin', body: ... });
```

## 3. String Utilities (`ro.str`)
문자열 케이스 변환 유틸리티입니다.
*   `ro.str.camel`: 카멜 케이스 변환
*   `ro.str.kebab`: 케밥 케이스 변환
*   `ro.str.snake`: 스네이크 케이스 변환

## 4. Check Utilities (`ro.is`)
*   `ro.is.camel`: 카멜 케이스 여부 확인

## 5. Object Utilities (`ro.obj`)
*   **`ro.obj.get(obj, path)`**: Dot notation(점 표기법)을 사용하여 중첩된 객체(Nested Object)의 속성 값을 안전하게 가져옵니다.

## 6. List Utilities (`ro.list`)
*   **`ro.list.toMap(list, keyPath)`**: 객체 리스트(Array)를 특정 키(Key) 값을 기준으로 하는 맵(Map) 형태의 객체로 변환합니다.

## 7. Global Space (`ro.space`)
전역 변수 오염을 방지하고 구조화된 네임스페이스를 관리합니다.
*   `ro.space.ns`: 네임스페이스 생성
*   `ro.space.set`: 값 설정 (덮어쓰기 방지)
*   `ro.space.get`: 값 조회

## 8. Path Utilities (`ro.path`)
*   `ro.path.isValid`: 경로 문자열 유효성 검사
