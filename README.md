# @mars-/ro

Robust & Lightweight JavaScript Utility Library.
안정성과 보안을 최우선으로 고려한 자바스크립트 유틸리티 라이브러리입니다.

## Installation

```bash
npm install @mars-/ro
```

## Usage

```javascript
import ro from '@mars-/ro';
// or
const ro = require('@mars-/ro');
```

## API Documentation

### Core Utilities

#### `ro.extend(deep, target, ...sources)`
객체를 병합합니다. `deep` 옵션을 `true`로 주면 깊은 복사를 수행합니다.

```javascript
ro.extend(true, {}, obj1, obj2);
```

#### `ro.hasOwn(obj, key)`
객체가 특정 프로퍼티를 직접 소유하고 있는지 안전하게 확인합니다.

```javascript
ro.hasOwn({ a: 1 }, 'a'); // true
```

### Plugin System (`ro.use`)

라이브러리 기능을 런타임에 확장합니다. Vue.js 플러그인 시스템과 유사한 `ro.use`를 사용합니다.

#### 1. `install` 메서드가 있는 객체
가장 권장되는 방식입니다. 초기화 로직을 명확히 분리할 수 있습니다.

```javascript
const myPlugin = {
    install(ro, options) {
        // ro 객체에 기능 추가
        ro.myFeature = function() { console.log('Feature Added'); };
    }
};

ro.use(myPlugin, { someOption: true });
```

#### 2. 함수형 플러그인
간단한 플러그인은 함수 하나로 정의할 수 있습니다.

```javascript
function myPlugin(ro, options) {
    ro.simpleFeature = 'Simple';
}

ro.use(myPlugin);
```

#### 3. 자동 등록 객체 (name + body)
기존 `add` 방식과 유사하게 이름과 본체를 지정하여 바로 등록합니다.

```javascript
ro.use({
    name: 'myCalc',
    body: function(a, b) { return a + b; }
});

ro.myCalc(1, 2); // 3
```

### String Utilities (`ro.str`)

*   **`ro.str.camel(text)`**: `foo-bar` -> `fooBar`
*   **`ro.str.kebab(text)`**: `fooBar` -> `foo-bar`
*   **`ro.str.snake(text, upper?)`**: `fooBar` -> `FOO_BAR`

### Check Utilities (`ro.is`)

*   **`ro.is.camel(text)`**: 카멜 케이스 여부 확인.
*   **`ro.is.plainObject(obj)`**: 순수 객체 여부 확인.

### Object Utilities (`ro.obj`)

#### `ro.obj.get(obj, path)`
중첩된 객체의 속성을 안전하게 가져옵니다.

```javascript
ro.obj.get(data, 'user.profile.name');
```

### List Utilities (`ro.list`)

#### `ro.list.toMap(list, keyPath)`
리스트를 특정 키 기준의 맵(객체)으로 변환합니다.

```javascript
ro.list.toMap(users, 'id');
```

### Global Space (`ro.space`)

안전하게 중첩된 객체 공간을 생성하거나 값을 설정/조회합니다.

```javascript
ro.space.ns('app.ui');
ro.space.set('app.config.version', '1.0.0');
ro.space.get('app.config.version');
```

### Path Utilities (`ro.path`)

#### `ro.path.isValid(path, options)`
경로 문자열의 유효성을 검사합니다.

```javascript
ro.path.isValid('a/b/c'); // true
```
