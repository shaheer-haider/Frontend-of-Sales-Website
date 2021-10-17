<template>
    <div class="pd-l-25">
        <input type="button" value="Today's Report" @click="() => generateDailyReport()" />
        <input type="button" value="Yesterday's Report" @click="yesterdaysReport" />
        <div class="mg-t-50">
            <p class="font-18">Choose Date for Older Report</p>
            <input class="mg-t-10" type="date" v-model="selectedDate" />

            <input
                v-if="selectedDate"
                type="button"
                :value="'Create Report of ' + _selectedDate().toDateString()"
                @click="() => customSingleDateReport(_selectedDate())"
            />
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;
export default {
    data() {
        return {
            duration: "Daily",
            reportsDate: new Date(),
            selectedDate: "",
        }
    },
    methods: {
        generateDailyReport() {
            axios.get(`http://localhost:5000/day-report/${this.reportsDate.toLocaleDateString().replaceAll('/', '-')}`).then((response) => {
                let reportData = { date: this.reportsDate.toLocaleDateString(), duration: "Daily", data: response['data'] }
                localStorage.setItem("dataForReport", JSON.stringify(reportData));
                this.$router.push(`/generate-report`)
            })
        },
        yesterdaysReport() {
            let todaysDate = new Date()
            this.reportsDate.setDate(todaysDate.getDate() - 1)
            this.generateDailyReport()
        },
        customSingleDateReport(date) {
            this.reportsDate = date
            this.generateDailyReport()
        },
        _selectedDate() {
            return new Date(this.selectedDate)
        }
    }

}

</script>
