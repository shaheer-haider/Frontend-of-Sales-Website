<template>
    <div class="pd-l-25">
        <input type="button" value="Last Seven Days" @click="lastSevenDaysReportBtn" />
        <div class="mg-t-50">
            <h2>Older Weeks Report?</h2>
            <div class="font-18">
                <label for="date">Choose Start Date of Week:</label>
                <input id="date" class="mg-t-10" type="date" v-model="selectedDate" />
                <input
                    type="button"
                    v-if="selectedDate"
                    :value="_selectedDate().toDateString().slice(4) + ' to ' + lastDateOfWeek.toDateString().slice(4)"
                    @click="() => generateWeeklyReport(_selectedDate())"
                />
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;
export default {
    data() {
        return {
            selectedDate: "",
        }
    },
    computed: {
        lastDateOfWeek() {
            let lastDate = new Date();
            if (this.selectedDate !== "") {
                lastDate = this._selectedDate();
                lastDate.setDate(lastDate.getDate() + 6)
            }
            return lastDate
        },
    },
    methods: {
        _selectedDate() {
            return new Date(this.selectedDate)
        },
        generateWeeklyReport(date) {
            axios.get(`http://localhost:5000/week-report/${date.toLocaleDateString().replaceAll('/', '-')}`).then((response) => {
                let reportData = {
                    date: date.toDateString().slice(4) + ' to ' + this.lastDateOfWeek.toDateString().slice(4),
                    duration: "Weekly",
                    data: response['data']
                };
                localStorage.setItem("dataForReport", JSON.stringify(reportData));
                this.$router.push(`/generate-report`)
            })
        },
        lastSevenDaysReportBtn() {
            let firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 6);
            this.generateWeeklyReport(firstDate)
        }
    }
}
</script>
