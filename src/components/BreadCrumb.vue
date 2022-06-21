<template>
  <section class="flex h-full items-center justify-between px-4">
    <div>
      <slot></slot>
    </div>
    <div>
      <a
        href="https://www.taiwanbus.tw/"
        target="_blank"
        class="flex-c hover:underline">
        <IconInfo class="mr-2 h-6 w-6"></IconInfo>
        時刻表
      </a>
    </div>
  </section>
</template>
