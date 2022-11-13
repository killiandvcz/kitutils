<script>
    export let gap = "20px";
</script>

<div class="inline" style:gap={gap}>
    <slot></slot>
</div>


<style lang="scss">
  .inline{
    display: flex;
    flex-direction: row;
  }
</style>