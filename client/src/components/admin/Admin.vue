<template>
  <div class="container expand">
    <div
      v-if="!logged"
      class="admin"
    >
      <div
        v-for="(error, key) in errors"
        :key="key"
        class="error"
      >
        {{ error }}
      </div>
      <form>
        <div>
          <input
            v-model="login"
            type="login"
            class="form-control admin-control"
          >
        </div>
        <div>
          <input
            v-model="pwd"
            type="password"
            class="form-control admin-control"
          >
        </div>
        <div>
          <button
            class="btn btn-info admin__btn"
            @click="authorise"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="right-align">
        <button
          class="btn btn-default"
          @click="logout"
        >
          Выход
        </button>
      </div>
      <div class="admin__table">
        <Table
          :table="table"
          @changeSelect="setStatus"
          @deleteOrder="deleteOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { cookie } from '@/components/helpers/cookies.js';
import Table from '@/components/elements/Table';

export default {
  name: 'Admin',
  components: {
    Table,
  },
  data() {
    return {
      logged: false,
      login: '',
      pwd: '',
      errors: [],
      table: {
        optionsStatus: [
          '1. В работе',
          '2. Отменен',
          '3. Линк выслан',
          '4. Оплачен',
          '5. Отправлен',
          '6. Получен',
        ],
        columns: [
          'ID',
          'Сумма',
          'Продукты',
          'Адрес',
          'Статус',
        ],
      },
    };
  },
  created() {
    const auth = cookie.getCookie('authorised');
    if (auth) {
      this.logged = true;
    }
    this.setOrders();
  },
  methods: {
    setOrders() {
      const ws = new WebSocket('ws://localhost:8999', 'echo-protocol');
      ws.onopen = () => {
			    // console.log('socket connection opened properly');
      };
      ws.onmessage = (evt) => {
			   // console.log("Message received = " + evt.data);
			    const orders = JSON.parse(evt.data);
			    this.table.selectedStatus = [];
			    this.table.rows = [];
			    const details = this.getDetails(orders);
			    this.table = { ...this.table, ...details };
      };
      ws.onclose = () => {
			    // console.log("Connection closed...");
      };
    },
    deleteOrder(id) {
      const confirmed = confirm('Вы точно хотите удалить заказ?');
      if (confirmed) {
        this.$store.dispatch('deleteOrder', id).then(
          (res) => {
            this.setOrders();
          },
          err => console.log(err),
        );
      }
    },
    getDetails(orders) {
      const obj = { selectedStatus: [], rows: [] };
      orders.forEach((value) => {
        		const address = {
          array: [],
          notEmpty(value, str) {
            if (value) this.array.push(`${str}: ${value}`);
            return this;
          },
        };
        		const details = [];
        		address
        		.notEmpty(value.country, 'Country')
        		.notEmpty(value.city, 'City')
        		.notEmpty(value.address, 'Address')
        		.notEmpty(value.email, 'Email')
        		.notEmpty(value.index, 'Index')
        		.notEmpty(value.name, 'Name')
        		.notEmpty(value.phone, 'Phone');
        		details.push(value._id, value.totalPrice, value.products, address.array);
        		const status = value.status ? value.status : 0;
        		obj.selectedStatus.push(status);
        		obj.rows.push(details);
        	});
      return obj;
    },
    authorise(ev) {
      ev.preventDefault();
      this.errors = this.validate();
      const obj = { login: this.login, password: this.pwd };
      if (!this.errors.length) {
        this.$store.dispatch('authorise', obj).then(() => {
          cookie.setCookie('authorised', true);
          this.logged = true;
        }, (err) => {
          this.errors.push('Пароль или логин не верны');
          this.logged = false;
        });
      }
    },
    setStatus(obj) {
      const url = `${this.$store.getters.getHost}/setStatus`;
      const status = Number.isInteger(obj.input)
        ? obj.input : this.table.optionsStatus.indexOf(obj.input);
      axios.post(url, { statusObj: { id: obj.id, status } })
        .then((response) => {
			    this.setOrders();
        });
    },
    validate() {
      let error = [];
      error = this.validateInput(this.login, 'логин', error);
      error = this.validateInput(this.pwd, 'пароль', error);
      return error;
    },
    validateInput(str, property, errors) {
      if (!str) {
        errors.push(`Введите ${property}`);
      } else if (str.length < 4) {
        errors.push(`Слишком короткий ${property}`);
      }
      return errors;
    },
    logout() {
      this.logged = false;
      cookie.deleteCookie('authorised');
    },
  },
};
</script>

<style lang="less">
.admin {
	text-align: center;
	max-width: 500px;
	margin: auto;
}
.admin-control {
	margin-bottom: 10px;
}
.admin__btn {
	width: 100%;
}
.right-align {
	text-align: right;
}
.admin__table {
	margin-top: 10px;
	td:nth-child(5){
		white-space: nowrap;
	}
	.table__id {
		max-width: 100px;
	    white-space: nowrap;
	    overflow: hidden;
	    display: block;
	    padding: 5px;
	    text-overflow: ellipsis;
	}
}
.align-right {
	text-align: right;
}
.admin__table {
	font-size: 16px;
	.list-group-item {
		padding:5px;
	}
}
</style>
