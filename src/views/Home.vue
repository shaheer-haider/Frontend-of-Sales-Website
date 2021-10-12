<template>
  <div class="home">
    <h1 id="addSalesTitle">Add Sales</h1>

    <div id="salesForm">
      <div class="inputField">
        <label for="date" class="font-18">Date:</label>
        <input type="date" name="date" v-model="date" />
      </div>

      <div class="inputField">
        <label for="itemName" class="font-18">Item Name:</label>
        <input type="text" name="itemName" v-model="itemName" />
      </div>

      <div class="inputField">
        <label for="work" class="font-18">Work:</label>
        <input type="text" name="work" v-model="work" />
      </div>

      <div class="inputField">
        <label for="weight" class="font-18">Weight:</label>
        <input type="number" name="weight" min="0.01" step="0.01" v-model="weight" />
      </div>

      <div class="inputField">
        <label for="priceOfDay" class="font-18">Price of Day:</label>
        <input type="number" name="priceOfDay" min="0.01" step="0.01" v-model="priceOfDay" />
      </div>

      <div class="inputField">
        <br />
        <input id="saveButton" class="font-18" type="button" value="Save" @click="save" />
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/data.json"
export default {
  name: 'Home',
  data() {
    return {
      itemName: null,
      work: null,
      weight: 0,
      priceOfDay: 0,
      model: {}
    }
  },
  computed: {
    date() {
      let today = new Date().toLocaleDateString()
      today = today.split("/")
      today = today[2] + "-" + today[0] + "-" + today[1]
      return today
    }
  },
  methods: {
    save() {
      this.model = {
        date: this.date,
        itemName: this.itemName,
        work: this.work,
        weight: this.weight,
        priceOfDay: this.priceOfDay
      }

      let allData = data
      allData[`${Date.now() + Math.random()}`] = this.model
    }
  }
}

</script>

<style scoped>
#addSalesTitle {
  margin-top: 30px;
  margin-left: 50px;
}

.inputField {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
}
#salesForm {
  padding-top: 30px;
  padding-left: 60px;
  max-width: 700px;
}
#saveButton {
  padding: 10px 20px 10px 20px;
}
@media only screen and (max-width: 800px) {
  .inputField {
    flex-direction: column;
  }
}
</style>
