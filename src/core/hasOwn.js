/**
 * 객체가 특정 프로퍼티를 직접 소유하고 있는지 확인합니다.
 * Object.prototype.hasOwnProperty.call을 사용하여
 * 프로토타입이 없는 객체(Object.create(null))나 hasOwnProperty가 덮어씌워진 객체에서도 안전하게 동작합니다.
 *
 * @param {Object} obj - 확인할 객체
 * @param {string|Symbol} key - 확인할 프로퍼티 키
 * @returns {boolean}
 */
export default function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}