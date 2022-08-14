<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <div>
              <router-link to="/" class="text-black" target="_self">
                <i class="fa fa-chevron-left" style="font-size: 0.9rem;" aria-hidden="true"></i>&nbsp;back to <span class="font-weight-bold">Login App</span>
              </router-link>
            </div>
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-muted">The page you are looking for was not found.</p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404"
}
</script>
