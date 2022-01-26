import Component from "./core/Component.js";
import VendingMachine from "./components/VendingMachine.js";

export default class App extends Component {
    // Override
    template() {
        let html = '';
        html += '<VendingMachine data-component="vendingMachine"></VendingMachine>';
        html += '<VendingMachine data-component="vendingMachine2"></VendingMachine>';

        return html;
    };

    // Override
    mounted() {
        const {
            createVendingMachine
        } = this;
        const $vendingMachine = this.$target.querySelector('[data-component="vendingMachine"]');
        const $vendingMachine2 = this.$target.querySelector('[data-component="vendingMachine2"]');

        new VendingMachine($vendingMachine);
        // createVendingMachine($vendingMachine);
        // createVendingMachine($vendingMachine2);
    };

    /* 자판기 컴포넌트 및 데이터 삽입 함수 */
    createVendingMachine($target) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './src/data/drinks.json', true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                new VendingMachine($target, data);
            }
        };
        xhr.send();
    };
}