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
객체를 병합합니다. `deep` 옵션을 `true`로 주면 깊은 복사를 수행합니다. 프로토타입 오염 방지 및 순환 참조 방지 로직이 포함되어 있습니다.

```javascript
ro.extend(true, {}, obj1, obj2);
```

#### `ro.hasOwn(obj, key)`
객체가 특정 프로퍼티를 직접 소유하고 있는지 안전하게 확인합니다. `Object.create(null)`로 생성된 객체나 `hasOwnProperty`가 오버라이딩된 객체에서도 안전하게 동작합니다.

```javascript
ro.hasOwn({ a: 1 }, 'a'); // true
```

### Plugin System (`ro.plugin`)

#### `ro.plugin.add(name, definition)`
라이브러리 기능을 런타임에 확장합니다.

```javascript
ro.plugin.add('myPlugin', {
    version: '1.0.0',
    body: function(args, context) {
        // context === ro
        return 'Hello ' + args.name;
    }
});
```

### String Utilities (`ro.str`)

#### `ro.str.camel(text)`
문자열을 카멜 케이스로 변환합니다. (`foo-bar` -> `fooBar`)

#### `ro.str.kebab(text)`
문자열을 케밥 케이스로 변환합니다. (`fooBar` -> `foo-bar`)

#### `ro.str.snake(text, upper?)`
문자열을 스네이크 케이스로 변환합니다. (`fooBar` -> `FOO_BAR`)

### Check Utilities (`ro.is`)

#### `ro.is.camel(text)`
문자열이 카멜 케이스인지 확인합니다.

#### `ro.is.plainObject(obj)`
값이 순수 객체(Plain Object)인지 확인합니다.

```javascript
ro.is.plainObject({}); // true
ro.is.plainObject(new Date()); // false
```

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
// 네임스페이스 생성
ro.space.ns('app.ui.theme');

// 값 설정 (기존 값 덮어쓰기 방지 옵션 제공)
ro.space.set('app.config.version', '1.0.0', { override: false });

// 값 조회
ro.space.get('app.config.version');
```

### Path Utilities (`ro.path`)

#### `ro.path.isValid(path, options)`
경로 문자열의 유효성을 검사합니다.

```javascript
ro.path.isValid('a/b/c'); // true
ro.path.isValid('a.b.c', '.'); // true
```
