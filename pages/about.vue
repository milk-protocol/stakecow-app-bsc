<template>
  <div>
    <div>
      <div class="intro">
        <h3 class="text-center">
          {{$t("about.title")}}
        </h3>
        <br>
        <p>
          <i18n path="about.total-supply" tag="label" for="about.total-supply-number">
            <b>13292</b>
          </i18n>
        </p>
        <p>
          {{$t("about.desc")}}
        </p>

        <p>
          <i18n path="about.drop-free" tag="label" for="about.drop-free-number">
            <b>10</b>
          </i18n>
        </p>
        <h4>{{$t("about.cow")}}</h4>
        <div>
          <i18n path="about.angier" tag="label" for="about.angier-number">
            <b>2000</b>
          </i18n>
        </div>
        <div>
          <i18n path="about.genxi" tag="label" for="about.genxi-number">
            <b>2000</b>
          </i18n>
        </div>
        <div>
          <i18n path="about.holstein" tag="label" for="about.holstein-number">
            <b>4641</b>
          </i18n>
        </div>

        <div>
          <i18n path="about.holstein2" tag="label" for="about.holstein-number">
            <b>4641</b>
          </i18n>
        </div>

        <br>
        <br>
        <h4>{{$t("about.contracts")}}</h4>
        <div>
          <i18n path="about.milk" tag="label" for="about.milk-address">
            <a href="https://bscscan.com/address/0x8e9f5173e16ff93f81579d73a7f9723324d6b6af" target="_blank">0x8e9f5173e16ff93f81579d73a7f9723324d6b6af</a>
          </i18n>
        </div>
        <div>
          <i18n path="about.cowfactory" tag="label" for="about.cowfactory-address">
            <a href="https://bscscan.com/address/0x4BF38c704675a148E4ECb8142B8e505591092E97" target="_blank">0x4BF38c704675a148E4ECb8142B8e505591092E97</a>
          </i18n>
        </div>
        <div>
          <i18n path="about.angier-cow" tag="label" for="about.angier-cow-address">
            <a href="https://bscscan.com/address/0xA789383b848BcD7c60975094AE3ba5444ED70103" target="_blank">0xA789383b848BcD7c60975094AE3ba5444ED70103</a>
          </i18n>
        </div>

        <div>
          <i18n path="about.genxin-cow" tag="label" for="about.angier-cow-address">
            <a href="https://bscscan.com/address/0xC3477ad3755DCD84C7a100807ED9c53fb3b8a0c8" target="_blank">0xC3477ad3755DCD84C7a100807ED9c53fb3b8a0c8</a>
          </i18n>
        </div>

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