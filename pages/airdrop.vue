<template>
  <div>
    <div>
      <div class="intro">
        <h3 class="text-center">
          {{$t("airdrop.airdrop-plan")}}
        </h3>
        <br>
        <p>{{$t("airdrop.airdrop-plan-desc")}}</p>
        <div>{{$t("airdrop.how-to-get")}}</div>
        <div>{{$t("airdrop.join")}}</div>
        <br>
        <p>
          <a href="https://twitter.com/StakeCow" class="link" target="_blank">{{$t("footerbar.twitter")}}</a>
          <a href="https://t.me/StakeCow" class="link" target="_blank">{{$t("footerbar.telegram")}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .intro {
    background-color: #eee;
    padding: 1rem 1rem;
  }
  .cover {
    text-align: center;
  }
  .cover img {
    display: inline-block;
    width: 150px;
    text-align: center;
  }
  .cow img {
    width: 100%;
    padding: 1rem;
    text-align: center;
    display: inline-block;
  }
  .avatar {
    text-align: center;
    font-size: 5rem;
  }
  .milk {
    width: 5rem;
  }
</style>