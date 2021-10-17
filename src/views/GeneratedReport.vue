<template>
    <div v-if="generatedData['data'][0] != null" id="report">
        <div id="reportTitleDiv">
            <h1 v-if="generatedData['date'] == new Date().toLocaleDateString()">
                {{ generatedData["duration"] }} Today's Sales
                Report
            </h1>
            <h1 v-else>Report of {{ generatedData['date'] }}</h1>
        </div>

        <div id="reportContent">
            <div id="table-wrapper">
                <table id="reportTable">
                    <thead>
                        <tr>
                            <th class="font-18">S. No.</th>
                            <th class="font-18">Item Name</th>
                            <th class="font-18">Work</th>
                            <th class="font-18">Weight</th>
                            <th v-if="generatedData['duration'] != 'Daily'" class="font-18">Rate</th>
                            <th v-if="generatedData['duration'] != 'Daily'" class="font-18">Date</th>
                            <th class="font-18">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr v-for="(data, index) in generatedData['data']" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ data['itemName'] }}</td>
                            <td>{{ data['work'] }}</td>
                            <td>{{ data['weight'].toFixed(2) }} gm</td>
                            <!-- if not daily then show price of day seperately -->
                            <td v-if="generatedData['duration'] != 'Daily'">{{ data['priceOfDay'] }}</td>
                            <!-- if not daily then show date of entry seperately -->
                            <td
                                v-if="generatedData['duration'] != 'Daily'"
                            >{{ new Date(data['date']).toDateString() }}</td>
                            <td>Rs. {{ (data['weight'] * data["priceOfDay"]).toFixed(2) }}</td>
                        </tr>
                        <tr>&nbsp;</tr>
                    </tbody>
                </table>
            </div>
            <div class="flex-sp-between">
                <p class="font-18 width-400">
                    <b>Date:</b>
                    {{ generatedData['date'] }}
                </p>
                <p v-if="generatedData['duration'] == 'Daily'" class="font-18 width-400">
                    <b>Price of Day:</b>
                    Rs. {{ generatedData['data'][0]["priceOfDay"] }}
                </p>
            </div>

            <div class="flex-sp-between">
                <p class="font-18 width-400">
                    <b>Total Weight:</b>
                    {{ totalWeight.toFixed(2) }} gm
                </p>
                <p class="font-18 width-400">
                    <b>Total Price:</b>
                    Rs. {{ totalPrice.toFixed(2) }}
                </p>
            </div>
        </div>
    </div>

    <h1 v-else>No Report Found on {{ generatedData['date'] }}.</h1>
</template>

<script>
export default {
    data() {
        return {
            generatedData: JSON.parse(localStorage.getItem("dataForReport"))
        }
    },
    computed: {
        totalWeight() {
            if (this.generatedData['data'].length > 1)
                return this.generatedData['data'].map(dataSingle => dataSingle['weight']).reduce((weight1, weight2) => weight1 + weight2)
            else
                return this.generatedData['data'][0]['weight']
        },
        totalPrice() {
            return this.generatedData['data'].map(dataSingle => dataSingle['weight'] * dataSingle['priceOfDay']).reduce((price1, price2) => price1 + price2)
        }
    },
}
</script>

<style scoped>
#report {
    padding: 2%;
    width: calc(100% - 250px);
}

#reportTable {
    width: 100%;
    border-collapse: collapse;
}

#table-wrapper {
    border: 1px solid black;
    max-height: calc(100vh - 250px);
    margin-bottom: 20px;
    overflow-y: scroll;
}

#reportTitleDiv {
    text-align: center;
    margin-bottom: 25px;
}

table,
th,
td {
    border: 1px solid black;
}

td {
    padding-left: 5px;
}

/* only when width is less than 800px */
@media only screen and (max-width: 800px) {
    #report {
        width: 100%;
    }
}
</style>