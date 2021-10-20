<template>
    <div class="home">
        <h1 id="addSalesTitle">Add Sales</h1>
        <form id="salesForm" @submit.prevent="save">
            <div class="inputField">
                <label for="date" class="font-18">Date:</label>
                <input
                        id="date"
                        type="date"
                        required
                        placeholder="MM/DD/YYYY"
                        v-model="inputs.date"
                />
            </div>

            <div class="inputField">
                <label for="itemName" class="font-18">Item Name:</label>
                <input
                        id="itemName"
                        type="text"
                        placeholder="Enter Item Name"
                        required
                        name="itemName"
                        v-model="inputs.itemName"
                />
            </div>

            <div class="inputField">
                <label for="work" class="font-18">Work:</label>
                <input
                        id="work"
                        type="text"
                        placeholder="Work on Item"
                        required
                        name="work"
                        v-model="inputs.work"
                />
            </div>

            <div class="inputField">
                <label for="weight" class="font-18">Weight:</label>
                <input
                        id="weight"
                        type="number"
                        placeholder="Enter Weight in gm"
                        name="weight"
                        required
                        min="0.01"
                        step="0.01"
                        v-model="inputs.weight"
                />
            </div>

            <div class="inputField">
                <label for="priceOfDay" class="font-18">Price of Day:</label>
                <input
                        id="priceOfDay"
                        type="number"
                        placeholder="Enter Price of Day"
                        name="priceOfDay"
                        required
                        min="0.01"
                        step="0.01"
                        v-model="inputs.priceOfDay"
                />
            </div>
            <div class="inputField">
                <br/>
                <button id="saveButton" class="font-18" type="submit">Save</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    const axios = require('axios').default;
    import {ref} from 'vue'

    const inputs = ref({
        date: new Date().toISOString().slice(0, 10),
        itemName: null,
        work: null,
        weight: 0.1,
        priceOfDay: 0.1,
    });

    function resetInputFields() {
        // reset input fields
        inputs.value.date = new Date().toISOString().slice(0, 10);
        inputs.value.itemName = null;
        inputs.value.work = null;
        inputs.value.weight = 0.1;
        inputs.value.priceOfDay = 0.1
    }

    function save() {
        axios.post(
            'http://localhost:5000/add-data',
            {
                date: "date",
                itemName: "WOW",
                work: "OK",
                weight: "10",
                priceOfDay: "20"
            },
            {
                headers: {
                    date: inputs.value.date,
                    itemName: "OK"
                }
            }
        )
            .then((response) => {
                console.log(response)
            })
            .catch(() => {
                // send error in my logs
                // it is to do later
                // show error message
            })
            .finally(() => {
                // show success
                resetInputFields()
            })
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
