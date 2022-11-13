<script>
    export let maxWidth = "500px";
</script>

<div class="_form" style:max-width={maxWidth}>
    <div class="form">
        <slot></slot>
    </div>
</div>

<style lang="scss">
  ._form{
    width: 100%;

    display: flex;
    flex-direction: column;
    .form{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
</style>