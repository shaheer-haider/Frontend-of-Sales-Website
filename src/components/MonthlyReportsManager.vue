<template>
    <div class="pd-l-25">
        <!-- for fixed this or last month, 0 or 1 param is used to subtract month if needed -->
        <input
                type="button"
                value="This Month"
                @click="() => generateMonthlyReport(thisMonthOrLast(1))"
        />
        <input
                type="button"
                value="Last Month"
                @click="() => generateMonthlyReport(thisMonthOrLast(0))"
        />
        <div class="mg-t-50">
            <h4>OR</h4>
            <div class="font-18">
                <label for="monthSelect">Select a Month to generate report:</label>
                <input id="monthSelect" class="mg-t-10" type="month" v-model="selectedMonth"/>
                <input
                        v-if="selectedMonth"
                        type="button"
                        value="Generate Report"
                        @click="() => generateMonthlyReport(selectedMonth)"
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
                selectedMonth: null,
            }
        },
        methods: {
            generateMonthlyReport(month) {
                axios.get(`http://localhost:5000/month-report/${month}`).then((response) => {
                    month = month.split("-");
                    let dateString = `${new Date(month[0], month[1] - 1).toLocaleString('en-us', {month: 'short'})} ${month[1]}`;
                    let reportData = {
                        date: dateString,
                        duration: "Weekly",
                        data: response['data']
                    };
                    localStorage.setItem("dataForReport", JSON.stringify(reportData));
                    this.$router.push(`/generate-report`)
                })
            },
            thisMonthOrLast(m) {
                let month = new Date();
                month = month.getFullYear() + "-" + ((month.getMonth() + m) < 10 ? "0" : "") + (month.getMonth() + m);
                return month
            },
        },
    }
</script>
