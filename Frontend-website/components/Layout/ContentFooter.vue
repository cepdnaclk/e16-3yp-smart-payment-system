<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="https://github.com/cepdnaclk"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            cepdnaclk github community
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://github.com/cepdnaclk/e16-3yp-smart-payment-system"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            About Us
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://cepdnaclk.github.io/e16-3yp-smart-payment-system/"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Blog
          </a>
        </li>
      </ul>
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        
        <a
          href="https://github.com/cepdnaclk/e16-3yp-smart-payment-system/tree/main/Frontend-website"
          target="_blank"
          rel="noopener"
          >Group 16</a
        >
        for CO227 project.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
