<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'


const props = defineProps({
  getUser: Object
})

</script>

<template>
  <VerticalNavGroup class="top-menu" :item="{
    title: '모니터링',
    icon: 'bx-layout',
  }">
    <VerticalNavLink :item="{
      title: '배회 인원 찾기',
      to: '/find-monitor',
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup class="top-menu" :item="{
    title: '회원 정보',
    icon: 'bx-user',
  }">
    <VerticalNavLink :item="{
      title: '보호관찰자 관리',
      to: '/guardian-info',
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="getUser.roleType === 'control_super'" class="top-menu" :item="{
    title: '관리자 관리',
    icon: 'bx-atom',
  }">
    <VerticalNavLink :item="{
      title: '관리자 리스트',
      to: '/manage-management',
    }" />
  </VerticalNavGroup>
</template>

<style scoped>
.top-menu {
  margin: 25px 0;
}
</style>
