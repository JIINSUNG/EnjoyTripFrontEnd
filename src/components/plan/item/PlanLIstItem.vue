<script setup>
defineProps({ plan: Object })
</script>

<template>
  <router-link
    :to="{ name: 'plan-detail', params: { planId: plan.planId } }"
    class="article-title link-dark ge-3"
  >
    <v-card class="mx-auto" min-width="280">
      <v-card-item>
        <div>
          <div class="text-body-2 mb-1">{{ plan.sidoName }} {{ plan.gugunName }}</div>
          <div class="text-h5 mb-1">{{ plan.planTitle }}</div>
          <div class="text-subtitle-1">{{ plan.startDate }} ~ {{ plan.endDate }}</div>
        </div>
      </v-card-item>
    </v-card>
  </router-link>
</template>

<style scoped>
* {
  font-family: 'pretendard', sans-serif !important;
}

a {
  text-decoration: none;
}
</style>
