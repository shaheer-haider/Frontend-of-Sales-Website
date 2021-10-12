<template>
    <div class="pd-l-25">
        <h1>{{ selectedMonth }}</h1>
        <input type="button" value="This Month" @click="() => thisMonthOrLast(0)" />
        <input type="button" value="Last Month" @click="() => thisMonthOrLast(1)" />
        <div class="mg-t-50">
            <h4>OR</h4>
            <div class="font-18">
                <p>Select a Month to generate report:</p>
                <input class="mg-t-10" type="month" v-model="selectedMonth" />
                <input
                    v-if="selectedMonth"
                    type="button"
                    value="Generate Report"
                    @click="() => generateMonthlyReport(parseMonth(this.selectedMonth))"
                />
            </div>
        </div>
    </div>
</template>

<script>
import data from '@/data.json'
export default {
    data() {
        return {
            selectedMonth: null,
        }
    },
    methods: {
        localeDateToMonthAndYear(localDate) {
            return localDate.split("/")[0] + localDate.split("/")[2]
        },
        filteredData(month) {
            return Object.values(data).filter(
                item => this.localeDateToMonthAndYear(item["date"]) == month
            )
        },
        generateMonthlyReport(month) {
            let beautifyMonth = new Date(month.slice(0, -4)).toLocaleString('en-us', {month: "short"}) + " " + month.slice(-4)
            let reportData = { date: beautifyMonth, duration: "Monthly", data: this.filteredData(month) }
            localStorage.setItem("dataForReport", JSON.stringify(reportData))
            this.$router.push(`/generate-report`)
            return reportData
        },
        thisMonthOrLast(m) {
            let month = new Date()
            month.setMonth(month.getMonth() - m)
            month = (month.getMonth() + 1).toString() + month.getFullYear()
            this.generateMonthlyReport(month)
        },
        parseMonth(selectedMonth) {
            let d = new Date(selectedMonth)
            return (d.getMonth() + 1).toString() + d.getFullYear()
        }
    },
}
</script>
