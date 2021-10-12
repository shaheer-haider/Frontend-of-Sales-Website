<template>
    <div class="pd-l-25">
        <input type="button" value="Last Seven Days" @click="lastSevenDaysReport" />
        <div class="mg-t-50">
            <h2>Older Weeks Report?</h2>
            <div class="font-18">
                <p>Choose Start Date of Week:</p>
                <input class="mg-t-10" type="date" v-model="selectedDate" />
                <input
                    type="button"
                    v-if="selectedDate"
                    :value="_selectedDate().toDateString().slice(4) + ' to ' + lastDateOfWeek.toDateString().slice(4)"
                    @click="() => generateDailyReport(_selectedDate(), filteredData(_selectedDate()))"
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
            selectedDate: "",
        }
    },
    computed: {
        lastDateOfWeek() {
            let lastDate = new Date()
            if (this._selectedDate() != null) {
                lastDate = this._selectedDate()
            }
            lastDate.setDate(lastDate.getDate() + 6)
            return lastDate
        },
    },
    methods: {
        _selectedDate() {
            return new Date(this.selectedDate)
        },
        filteredData(startDate) {
            let dataList = []
            let currentDate = startDate
            for (let i = 0; i < 7; i++) {
                dataList.push(...Object.values(data).filter(
                    item => item["date"] == currentDate.toLocaleDateString()
                ))
                currentDate.setDate(currentDate.getDate() + 1)
            }
            return dataList
        },
        generateDailyReport(date, data) {
            date = date.toDateString().slice(4) + ' to ' + this.lastDateOfWeek.toDateString().slice(4)
            let reportData = { date: date, duration: "Weekly", data: data }
            localStorage.setItem("dataForReport", JSON.stringify(reportData));
            this.$router.push(`/generate-report`)
        },
        lastSevenDaysReport() {
            let firstDate = new Date()
            firstDate.setDate(firstDate.getDate() - 6)
            this.generateDailyReport(firstDate, this.filteredData(firstDate))
        }
    }
}
</script>
