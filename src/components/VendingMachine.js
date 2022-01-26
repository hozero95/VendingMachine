import Component from "../core/Component.js";

export default class VendingMachine extends Component {
    // Override
    setup() {
        if (this.$props !== undefined && this.$props !== null) {
            this.$state = {
                productList: this.$props,
                money: 0,
                totalMoney: 0
            };
        } else {
            this.$state = {
                productList: [],
                money: 0,
                totalMoney: 0
            };
        }
        this.loadSessionStorage();
    };

    // Override
    template() {
        const {
            productList,
            money,
            totalMoney
        } = this.$state;

        let html = '';
        html += '<div>';
        html += '   <h1 class="vm-h1">자판기</h1>';
        html += '   <table class="vm-table">';
        html += '      <thead>상품 목록</thead>';
        html += '      <br>';
        ///
        let wholeAmount = 0;
        for (let i = 0; i < productList.length; i++) {
            wholeAmount += productList[i].amount;
        }
        if (wholeAmount <= 0) {
            html += '<span>상품 목록이 없습니다.</span>';
        } else {
            html += '<span>총 상품 개수 : ' + wholeAmount + '</span>';
        }
        ///
        if (productList.length <= 0) {
            html += '<tr>';
            html += '   <th class="vm-th">상품 목록이 없습니다.</th>';
            html += '</tr>';
            html += '<tr>';
            html += '   <td class="vm-td">상품를 추가해주세요.</td>';
            html += '</tr>';
        } else {
            let row = Math.floor(productList.length / 3);

            if (parseInt(productList.length) % 3 > 0) {
                row++;
            }

            for (let i = 0; i < row; i++) {
                let jCount = i * 3;
                let tCount = jCount + 3;

                if (productList.length < tCount) {
                    tCount -= tCount - productList.length;
                }

                html += '<tr>';
                for (let j = jCount; j < tCount; j++) {
                    html += '<th class="vm-th">';
                    html += (j + 1) + '. ' + productList[j].name + ' (남은 수량 : <span>' + productList[j].amount + '</span>)';
                    html += '</th>';
                }
                html += '</tr>';
                html += '<tr>';
                for (let j = jCount; j < tCount; j++) {
                    html += '<td class="vm-td">';
                    let btnBuyText = productList[j].price + ' 원';
                    if (productList[j].amount <= 0) {
                        btnBuyText += ' (재고 없음)';
                        html += '   <button class="vm-btnBuy" data-index="' + j + '" style="background-color: red">';
                    } else if (productList[j].price > money) {
                        btnBuyText += ' (금액 부족)';
                        html += '   <button class="vm-btnBuy" data-index="' + j + '" style="background-color: red">';
                    } else {
                        html += '   <button class="vm-btnBuy" data-index="' + j + '" style="background-color: blue; color: white">';
                    }
                    html += btnBuyText + '</button>';
                    html += '</td>';
                }
                html += '</tr>';
            }
        }
        ///
        html += '   </table>';
        html += '   <br />';
        html += '   <table class="vm-table">';
        html += '      <thead>금액 현황</thead>';
        html += '      <tr>';
        html += '          <th class="vm-th">투입 금액</th>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-inputMoney" type="number"> 원';
        html += '              &nbsp;&nbsp;';
        html += '              <button class="vm-btnInput">투입하기</button>';
        html += '          </td>';
        html += '          <th class="vm-th">남은 금액</th>';
        html += '          <td class="vm-td">';
        html += '              <span>' + money + '</span> 원';
        html += '              &nbsp;';
        html += '              <button class="vm-btnReturn">반환</button>';
        html == '          </td>';
        html += '      </tr>';
        html += '   </table>';
        html += '   <br />';
        html += '   <button class="vm-btnCalculate">정산</button>';
        html += '   &nbsp;';
        html += '   <button class="vm-btnProductState">현황</button>';
        html += '   <br /><br /><br />';
        html += '   <hr />';
        html += '   <br /><br /><br />';
        html += '   <h1 class="vm-h1">관리자</h1>';
        html += '   <table class="vm-table">';
        html += '      <thead>상품 수정 및 삭제</thead>';
        html += '      <tr>';
        html += '          <th class="vm-th">상품 번호</th>';
        html += '          <th class="vm-th">상품 이름</th>';
        html += '          <th class="vm-th">상품 가격</th>';
        html += '          <th class="vm-th">상품 수량</th>';
        html += '          <td class="vm-td"></td>';
        html += '      </tr>';
        html += '      <tr>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-modProductIndex" type="number">';
        html += '              <button class="vm-btnLoadProduct">불러오기</button>';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-modProductName" type="text">';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-modProductPrice" type="number">';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-modProductAmount" type="number">';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <button class="vm-btnModProduct">수정하기</button>';
        html += '              <button class="vm-btnDelProduct">삭제하기</button>';
        html += '          </td>';
        html += '      </tr>';
        html += '   </table>';
        html += '   <br />';
        html += '   <table class="vm-table">';
        html += '      <thead>상품 추가</thead>';
        html += '      <tr>';
        html += '          <th class="vm-th">상품 이름</th>';
        html += '          <th class="vm-th">상품 가격</th>';
        html += '          <th class="vm-th">상품 수량</th>';
        html += '          <td class="vm-td"></td>';
        html += '      </tr>';
        html += '       <tr>';
        html += '           <td class="vm-td">';
        html += '               <input class="vm-addProductName" type="text">';
        html += '           </td>';
        html += '           <td class="vm-td">';
        html += '              <input class="vm-addProductPrice" type="number">';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <input class="vm-addProductAmount" type="number">';
        html += '          </td>';
        html += '          <td class="vm-td">';
        html += '              <button class="vm-btnAddProduct">추가하기</button>';
        html += '          </td>';
        html += '      </tr>';
        html += '   </table>';
        html += '   <br />';
        html += '   <table class="vm-table">';
        html += '      <thead>정산 현황</thead>';
        html += '      <tr>';
        html += '          <th class="vm-th">총 수입</th>';
        html += '          <td class="vm-td">';
        html += '              <span>' + totalMoney + '</span> 원';
        html += '          </td>';
        html += '      </tr>';
        html += '   </table>';
        html += '</div>';

        return html;
    };

    // Override
    render() {
        this.$target.innerHTML = this.template();
        this.saveSessionStorage();
    };

    // Override
    setEvent() {
        /* 금액 투입 이벤트 */
        this.addEvent('click', '.vm-btnInput', ({
            target
        }) => {
            const inputMoney = parseInt(this.$target.querySelector('.vm-inputMoney').value);
            if (isNaN(inputMoney) || inputMoney <= 0 || !Number.isInteger(inputMoney)) {
                alert('투입 금액이 잘못되었습니다.');
            } else {
                this.setState({
                    money: this.$state.money + inputMoney
                });
            }
        });

        /* 남은 금액 반환 이벤트 */
        this.addEvent('click', '.vm-btnReturn', ({
            target
        }) => {
            if (this.$state.money <= 0) {
                alert('반환할 금액이 없습니다.');
            } else {
                alert('반환된 금액: ' + this.$state.money);
                this.setState({
                    money: 0
                });
            }
        });

        /* 누적 판매 금액 알림 이벤트 */
        this.addEvent('click', '.vm-btnCalculate', ({
            target
        }) => {
            alert('누적 판매 금액: ' + this.$state.totalMoney);
        });

        /* 전체 상품 재고 알림 이벤트 */
        this.addEvent('click', '.vm-btnProductState', ({
            target
        }) => {
            let text = '';
            if (this.$state.productList.length <= 0) {
                text += '상품 목록이 없습니다.';
            } else {
                for (let i = 0; i < this.$state.productList.length; i++) {
                    text += (i + 1) + '. ' + this.$state.productList[i].name + ': ' + this.$state.productList[i].amount + '개 남음\n';
                }
            }
            alert(text);
        });

        /* 상품 구매 이벤트 */
        this.addEvent('click', '.vm-btnBuy', ({
            target
        }) => {
            if (this.$state.money <= 0) {
                alert('금액을 투입해주세요.');
            } else if (this.$state.productList[target.dataset.index].amount <= 0) {
                alert('품절된 상품입니다.');
            } else if (this.$state.money < this.$state.productList[target.dataset.index].price) {
                alert('금액이 부족합니다.\n부족한 금액: ' + (this.$state.productList[target.dataset.index].price - this.$state.money));
            } else {
                const productList = [...this.$state.productList];
                productList[target.dataset.index].amount--;
                this.setState({
                    productList: productList,
                    money: this.$state.money - productList[target.dataset.index].price,
                    totalMoney: this.$state.totalMoney + productList[target.dataset.index].price
                });
            }
        });

        /* 리스트 내 상품 정보 로드 이벤트 */
        this.addEvent('click', '.vm-btnLoadProduct', ({
            target
        }) => {
            const index = parseInt(this.$target.querySelector('.vm-modProductIndex').value);
            if (isNaN(index) || index > this.$state.productList.length || index <= 0) {
                alert('상품 번호가 잘못되었습니다.');
            } else {
                this.$target.querySelector('.vm-modProductName').value = this.$state.productList[index - 1].name;
                this.$target.querySelector('.vm-modProductPrice').value = this.$state.productList[index - 1].price;
                this.$target.querySelector('.vm-modProductAmount').value = this.$state.productList[index - 1].amount;
            }
        });

        /* 리스트 내 상품 정보 수정 이벤트 */
        this.addEvent('click', '.vm-btnModProduct', ({
            target
        }) => {
            const index = parseInt(this.$target.querySelector('.vm-modProductIndex').value);
            const name = this.$target.querySelector('.vm-modProductName').value;
            const price = parseInt(this.$target.querySelector('.vm-modProductPrice').value);
            const amount = parseInt(this.$target.querySelector('.vm-modProductAmount').value);
            if (isNaN(index) || index > this.$state.productList.length || index <= 0) {
                alert('상품 번호가 잘못되었습니다.');
            } else if (name === '') {
                alert('상품 이름이 빈 칸입니다.');
            } else if (isNaN(price) || price === 0) {
                alert('상품 가격이 잘못되었습니다.');
            } else if (isNaN(amount)) {
                alert('상품 수량이 잘못되었습니다.');
            } else {
                for (let i = 0; i < this.$state.productList.length; i++) {
                    if (i !== index - 1 && this.$state.productList[i].name === name) {
                        alert('같은 이름의 상품이 존재합니다.');
                        return;
                    }
                }
                if (confirm('상품을 수정하시겠습니까?')) {
                    const productList = [...this.$state.productList];
                    productList[index - 1].name = name;
                    productList[index - 1].price = price;
                    productList[index - 1].amount = amount;
                    this.setState({
                        productList: productList
                    });
                }
            }
        });

        /* 리스트 내 상품 삭제 이벤트 */
        this.addEvent('click', '.vm-btnDelProduct', ({
            target
        }) => {
            const index = parseInt(this.$target.querySelector('.vm-modProductIndex').value);
            if (isNaN(index) || index > this.$state.productList.length || index <= 0) {
                alert('상품 번호가 잘못되었습니다.');
            } else if (confirm('상품을 삭제하시겠습니까?')) {
                const productList = [...this.$state.productList];
                productList.splice(index - 1, 1);
                this.setState({
                    productList: productList
                });
            }
        });

        /* 상품 리스트 추가 함수 */
        this.addEvent('click', '.vm-btnAddProduct', ({
            target
        }) => {
            const name = this.$target.querySelector('.vm-addProductName').value;
            const price = parseInt(this.$target.querySelector('.vm-addProductPrice').value);
            const amount = parseInt(this.$target.querySelector('.vm-addProductAmount').value);
            if (name === '') {
                alert('상품 이름이 빈 칸입니다.');
            } else if (isNaN(price) || price === 0) {
                alert('상품 가격이 잘못되었습니다.');
            } else if (isNaN(amount)) {
                alert('상품 수량이 잘못되었습니다.');
            } else {
                for (let i = 0; i < this.$state.productList.length; i++) {
                    if (this.$state.productList[i].name === name) {
                        alert('같은 상품이 존재합니다.');
                        return;
                    }
                }
                if (confirm('상품을 추가하시겠습니까?')) {
                    const product = {
                        name: name,
                        price: price,
                        amount: amount
                    };
                    this.setState({
                        productList: [...this.$state.productList, product]
                    });
                }
            }
        });
    };

    // Override
    setStyle() {
        let $style = document.createElement("link");
        $style.href = "./src/css/vendingMachine.css";
        $style.rel = "stylesheet";
        $style.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild($style);
    };

    /* SessionStorage 저장 함수 */
    saveSessionStorage() {
        sessionStorage.setItem(this.$target.dataset.component, JSON.stringify(this.$state));
    };

    /* SexxionStorage 로드 함수 */
    loadSessionStorage() {
        if (sessionStorage.getItem(this.$target.dataset.component) !== null) {
            if (JSON.parse(sessionStorage.getItem(this.$target.dataset.component)).productList.length > 0) {
                this.setState(JSON.parse(sessionStorage.getItem(this.$target.dataset.component)));
            }
        }
    };
}