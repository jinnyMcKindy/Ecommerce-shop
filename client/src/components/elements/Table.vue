<template>
  <div>
    <table class="table admin__table">
      <thead>
        <tr>
          <th v-for="(column, index) in table.columns" :key="index" scope="col">
            <span>
              {{ column }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, productIndex) in table.rows" :key="productIndex">
          <td
            v-for="(row, index) in rows"
            :key="index"
            :class="{ table__id: index === 0 }"
            class="table__td"
          >
            <span v-if="!Array.isArray(row)" v-html="row" />
            <span v-else>
              <p>
                <button
                  :disabled="!row.length"
                  :data-target="`#collapse${index}${productIndex}`"
                  :aria-controls="`#collapse${index}${productIndex}`"
                  class="btn btn-primary btn-details"
                  type="button"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  Показать
                </button>
              </p>
              <div :id="`collapse${index}${productIndex}`" class="collapse">
                <div class="card ">
                  <ul class="list-group list-group-flush table__list">
                    <li
                      v-for="(list, lindex) in row"
                      :key="lindex"
                      class="list-group-item"
                    >
                      {{ list }}
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </td>
          <Input
            :value="table.optionsStatus[table.selectedStatus[productIndex]]"
            :disabled="table.selectedStatus[productIndex] === 1"
            :options="table.optionsStatus"
            type="select"
            @changeInput="args => change(args, rows[0])"
          />
          <td>
            <button
              :disabled="table.selectedStatus[productIndex] === 1"
              class="btn btn-warning"
              @click="change(1, rows[0])"
            >
              Товара нет
            </button>
          </td>
          <td>
            <button
              :disabled="table.selectedStatus[productIndex] === 2"
              class="btn btn-success"
              @click="change(2, rows[0])"
            >
              Линк
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="$emit('deleteOrder', rows[0])"
            >
              <i class="fa fa-times" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Input from "./Input";

export default {
  name: "Table",
  components: {
    Input
  },
  props: {
    table: {
      type: Object,
      default: function() {
        return {
          optionsStatus: [
            "1. В работе",
            "2. Отменен",
            "3. Линк выслан",
            "4. Оплачен",
            "5. Отправлен",
            "6. Получен"
          ],
          columns: ["ID", "Сумма", "Продукты", "Адрес", "Статус"]
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    change(input, id) {
      this.$emit("changeSelect", { input, id });
    }
  }
};
</script>
<style>
.table__list {
  max-width: 250px;
}
</style>
