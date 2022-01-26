export default class Component {
    $target; // 컴포넌트가 적용되는 위치의 태그
    $state; // 컴포넌트의 상태 데이터
    $props; // 부모로부터 받아오는 데이터

    /* 생성자 */
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.setStyle();
        this.render();
    };

    /* 컴포넌트가 생성될 때 1회만 불러오는 초기화 함수 */
    setup() {};

    /* 렌더링 직후 실행될 함수 */
    mounted() {};

    /* 실제 화면에 뿌려질 HTML 데이터 */
    template() {
        return '';
    };

    /* 렌더링 함수 */
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    };

    /* 화면 내 이벤트 세팅 함수 */
    setEvent() {};

    /* 컴포넌트의 상태 데이터 변경 함수 */
    setState(newState) {
        this.$state = {
            ...this.$state,
            ...newState
        };
        this.render();
    };

    /* 스타일 적용 함수 */
    setStyle() {};

    /* 이벤트를 컴포넌트가 적용되는 위치의 태그에 종속시키기 위한 함수 */
    /* 해당 함수를 통해 이벤트를 적용하면 렌더링 마다 이벤트를 적용시키지 않아도 됨. */
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);

        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) {
                return false;
            }
            callback(event);
        });
    };
}