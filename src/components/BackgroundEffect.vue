<template>
  <div class="background-effect">
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
    <div class="circle circle3"></div>
    <div class="circle circle4"></div>
    <div class="circle circle5"></div>
    <div class="circle circle6"></div>
    <div class="square square1"></div>
    <div class="square square2"></div>
    <div class="square square3"></div>
  </div>
</template>

<script setup>
// No script needed for simple CSS animation
</script>

<style scoped>
.background-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.square {
  position: absolute;
  opacity: 0.5;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  background: rgba(30, 58, 138, 0.15);
  border-radius: 15px;
}


.circle1 {
  width: 120px;
  height: 120px;
  background: rgba(30, 58, 138, 0.15); /* theme blue with opacity */
  top: 5%;
  left: 5%;
  animation-name: float1;
  animation-duration: 6s;
}

.circle6 {
  width: 90px;
  height: 90px;
  background: rgba(30, 58, 138, 0.1);
  top: 50%;
  left: 50%;
  animation-name: float2;
  animation-duration: 10s;
}

.square1 {
  width: 100px;
  height: 100px;
  top: 25%;
  left: 90%;
  animation-name: float2, rotate1;
  animation-duration: 7s, 20s;
  background: rgba(30, 58, 138, 0.15); /* blue with opacity */
}

.square2 {
  width: 80px;
  height: 80px;
  top: 75%;
  left: 5%;
  animation-name: float3, rotate2;
  animation-duration: 8s, 20s;
  background: rgba(30, 58, 138, 0.12); /* blue with opacity */
}

.square3 {
  width: 70px;
  height: 70px;
  top: 60%;
  left: 80%;
  animation-name: float1, rotate1;
  animation-duration: 9s, 25s;
  background: rgba(30, 58, 138, 0.1);
}

.square1 {
  width: 100px;
  height: 100px;
  top: 25%;
  left: 90%;
  animation-name: float2, rotate1;
  animation-duration: 7s, 20s;
  background: rgba(30, 58, 138, 0.15); /* blue with opacity */
}

.square2 {
  width: 80px;
  height: 80px;
  top: 75%;
  left: 5%;
  animation-name: float3, rotate2;
  animation-duration: 8s, 20s;
  background: rgba(30, 58, 138, 0.12); /* blue with opacity */
}


.circle2 {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3); /* white with more opacity */
  top: 40%;
  left: 70%;
  animation-name: float2;
  animation-duration: 8s;
}

.circle3 {
  width: 150px;
  height: 150px;
  background: rgba(30, 58, 138, 0.12); /* theme blue with opacity */
  top: 65%;
  left: 30%;
  animation-name: float3;
  animation-duration: 7s;
}

.circle4 {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2); /* white with opacity */
  top: 80%;
  left: 80%;
  animation-name: float1;
  animation-duration: 5s;
}

.circle5 {
  width: 60px;
  height: 60px;
  background: rgba(30, 58, 138, 0.2); /* theme blue with opacity */
  top: 20%;
  left: 50%;
  animation-name: float2;
  animation-duration: 9s;
}

@keyframes float1 {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-20px) translateX(15px); }
}

@keyframes float2 {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(15px) translateX(-10px); }
}

@keyframes float3 {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-10px) translateX(-15px); }
}

@keyframes rotate1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rotate2 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes rotate3 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rotate4 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
</style>
