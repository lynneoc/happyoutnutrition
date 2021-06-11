
 var x = new Vue({
     el:'#top',
     data:{
        fname: 'Evelina',
        htmlcontent: 'Hope you are feeling happy out today!'

       
  }
        
     

 })


 
 var dt = new Date().getHours();
        if (dt >= 0 && dt <= 11){
         document.getElementById("greating").innerHTML='Good Morning'
        }else if (dt >= 12 && dt <= 17){
            document.getElementById("greating").innerHTML='Good Afternoon'
        }else {
            document.getElementById("greating").innerHTML='Good Evening'
        }


        var modal = document.getElementById('id01');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  (function() {
    const form    = document.getElementById('calc-form');
    const results = document.getElementById('results');
    const errors  = document.getElementById('form-error');

    /**
     * Display a form validation error
     *
     * @param   {String}  msg  The validation message
     * @return  {Boolen}       Returns false
     */
    function errorMessage(msg) {
        errors.innerHTML = msg;
        errors.style.display = '';
        return false;
    }

    /**
     * Display the calculation results
     *
     * @param   {Integer}  calories  
     * @param   {Integer}  distance   
     * @param   {String}   unit       
     * @param   {Integer}  burnRate   
     * @param   {Integer}  calsPerHr  
     */
    function showResults(calories) {
        results.innerHTML = `<p>Your basal metabolic rate (BMR) is: <strong>${(calories).toFixed(2)} </strong> calories a day.</p><a href="#" id="rs">revise</a>`;
      results.style.display = ''
      form.style.display = 'none'
      errors.style.display = 'none'
    }
  
   
    function resetForm(e) {
      if(e.target.id = 'rs') {
        e.preventDefault();
        results.style.display = 'none';
        form.style.display = '';
        form.reset()
      }
    }

    
    function submitHandler(e) {
        e.preventDefault();

       
        let age = parseFloat(form.age.value);
        
        if(isNaN(age) || age < 0) {
            return errorMessage('Please enter a valid age');
        }
   
    
        let heightCM = parseFloat(form.height_cm.value);
        if(isNaN(heightCM) || heightCM < 0) {
            
          let heightFeet = parseFloat(form.height_ft.value);
          if(isNaN(heightFeet) || heightFeet < 0) {
              return errorMessage('Please enter a valid Height in feet or centimeters');
          }      
         let heightInches = parseFloat(form.height_in.value);
          if(isNaN(heightInches) || heightInches < 0) {
              heightInches=0;
          }   
          heightCM = (2.54 * heightInches) + (30.4 * heightFeet)
          
        }   

          let weight = parseFloat(form.weight.value);
          if(isNaN(weight) || weight < 0) {
              return errorMessage('Please enter a valid weight');
          }   
      
        if(form.weight_unit.value == 'lb') {
            weight = 0.453592 * weight;
        }
      
       let calories = 0;
       if(form.gender.value == 'Female') {
           
         calories = 655.09 + (9.56 * weight) + (1.84 * heightCM) - (4.67 * age);
        }  else {
         calories = 66.47 + (13.75 * weight) + (5 * heightCM) - (6.75 * age);
        }
 
        
       showResults(calories);
    }

   
    form.addEventListener('submit', submitHandler);
    results.addEventListener('click', resetForm, true);

})();


Vue.component('boardal', {
  template: `
    <transition name="boardal">
      <div class="boardal">
        <div class="boardal__mask" v-if="hasMask" @click="clickMask"></div>
        <div class="boardal__wrapper">
          <slot></slot>
          <div class="boardal__x" v-if="hasX" @click="clickX">&times;</div>
        </div>
      </div>
    </transition>
  `,
  props: [
    'hasX',
    'hasMask',
    'canClickMask'
  ],
  methods: {
    clickX: function(){
      this.$emit('toggle')
    },
    clickMask: function(){
      if(this.canClickMask) {
        this.$emit('toggle')
      }
    }
  }
})

let vm = new Vue({
  el: 'main',
  data: {
    modal: {
      isOpen: false,
      hasMask: true,
      canClickMask: false,
      hasX: false
    },
    step: 1,
    max: 1,
    showDots: true,
    orientation: 'row',
    // xray: 'hidden'
  },
  computed: {
    isFirstStep: function(){
      return (this.step === 1)
    },
    isLastStep: function(){
      return (this.step === this.max)
    },
    hasDots: function(){
      return (this.max > 1 && this.showDots)
    },
    x_multiplier: function(){
      return (this.orientation === 'row' ? -1 : 0)
    },
    y_multiplier: function(){
      return (this.orientation === 'row' ? 0 : -1)
    },
    axis: function() {
      return (this.orientation === 'row' ? 'row' : 'column')
    },
    axisReverse: function() {
      return (this.orientation === 'row' ? 'row-reverse' : 'column-reverse')
    },
    cross: function() {
      return (this.orientation === 'row' ? 'column' : 'row')
    },
    crossReverse: function() {
      return (this.orientation === 'row' ? 'column-reverse' : 'row-reverse')
    },
    nextIcon: function() {
      return (this.orientation === 'row' ? 'fa-arrow-right' : 'fa-arrow-down')
    },
    backIcon: function() {
      return (this.orientation === 'row' ? 'fa-arrow-left' : 'fa-arrow-up')
    },
    
  },
  watch: {
    orientation: 'setCssVars',
    // xray: 'setCssVars'
  },
  methods: {
    toggleModal: function(step) {
      step = step || 1
      this.modal.isOpen = !this.modal.isOpen
      if(this.modal.isOpen) {
        let self = this
        setTimeout(function(){
          self.$sections = self.$el.querySelectorAll('section')
          self.max = self.$sections.length
          self.goToStep(step)
        }, 1)
      }
    },
    setCssVars: function(){
      this.$el.style.setProperty('--x', (((this.step * 100) - 100) * this.x_multiplier) + '%')
      this.$el.style.setProperty('--y', (((this.step * 100) - 100) * this.y_multiplier) + '%')
      this.$el.style.setProperty('--axis', this.axis)
      this.$el.style.setProperty('--axis-reverse', this.axisReverse)
      this.$el.style.setProperty('--cross', this.cross)
      this.$el.style.setProperty('--cross-reverse', this.crossReverse)
      // this.$el.style.setProperty('--vision', this.xray)
    },
    goToStep: function(step){
      this.step = step > this.max ? this.max : step < 1 ? 1 : step
      this.currentSection = this.$sections[this.step-1]
      this.$sections.forEach(function(section){
        section.classList.remove('current')
      })
      this.currentSection.classList.add('current')
      this.currentSection.scrollTop = 0
      this.setCssVars()
    },
    skip: function(step){
      this.step+=step
      this.goToStep(this.step)
    },
    reset: function(){
      this.goToStep(1)
    },
    finish: function(){
      this.toggleModal()
    }
  } 
})
