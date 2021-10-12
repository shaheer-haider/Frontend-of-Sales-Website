<template>
    <div class="pd-l-25">
        <input
            type="button"
            value="Today's Report"
            @click="() => generateDailyReport(reportsDate, duration, filteredData())"
        />
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
import data from '@/data.json'
export default {
    data() {
        return {
            duration: "Daily",
            reportsDate: new Date(),
            selectedDate: "",
        }
    },
    methods: {
        generateDailyReport(date, duration, data) {
            let reportData = { date: date.toLocaleDateString(), duration: duration, data: data }
            localStorage.setItem("dataForReport", JSON.stringify(reportData));
            this.$router.push(`/generate-report`)
        },
        filteredData() {
            return Object.values(data).filter(
                item => item["date"] == this.reportsDate.toLocaleDateString()
            )
        },
        yesterdaysReport() {
            let todaysDate = new Date()
            this.reportsDate.setDate(todaysDate.getDate() - 1)
            this.generateDailyReport(this.reportsDate, this.duration, this.filteredData())
        },
        customSingleDateReport(date) {
            this.reportsDate = date
            this.generateDailyReport(date, this.duration, this.filteredData())
        },
        _selectedDate() {
            return new Date(this.selectedDate)
        }
    }

}

</script>
