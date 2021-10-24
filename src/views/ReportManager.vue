<template>
  <div id="reportManager">
    <h1 id="reportMainTitle">{{ duration }} Sales Report</h1>
    <DailyReportsManager v-if="duration === 'Daily'"></DailyReportsManager>
    <WeeklyReportsManager v-else-if="duration === 'Weekly'"></WeeklyReportsManager>
    <MonthlyReportsManager v-else></MonthlyReportsManager>
  </div>
</template>

<script>
import DailyReportsManager from '../components/DailyReportsManager.vue'
import WeeklyReportsManager from '../components/WeeklyReportsManager.vue'
import MonthlyReportsManager from '../components/MonthlyReportsManager.vue'
export default {
  name: 'ReportManager',
  components: { DailyReportsManager, WeeklyReportsManager, MonthlyReportsManager },
  computed: {
    duration() { return this.$route.params.duration },
  },

}
</script>

<style>
#reportMainTitle{
  padding: 25px;
}

</style>