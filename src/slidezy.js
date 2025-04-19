function Slidezy(selector, options = {}){
    this.container = document.querySelector(selector);
    if(!this.container){
        console.error(`Slidezy: Container '${selector} not found!'`);
        return;
    }

    this.options = Object.assign({},options);
    this.slide = Array.from(this.container.children);
    this.currentIndex = 0;


    this._init();
}

Slidezy.prototype._init = function(){
    this.container.classList.add("slidezy-wrapper");

    this._creatTrack();
    this._createNavigation();
}

Slidezy.prototype._creatTrack = function(){
    this.track = document.createElement("div");
    this.track.className ="slidezy-track"
    
    this.slide.forEach((slide) => {
        slide.classList.add("slidezy-slide")
        this.track.append(slide)
    });
    
    this.container.appendChild(this.track);
}

Slidezy.prototype._createNavigation = function(){
    this.prevBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");
    
    this.prevBtn.textContent = "<";
    this.nextBtn.textContent = ">";
    
    this.prevBtn.className = "slidezy-prev";
    this.nextBtn.className = "slidezy-next";
    
    this.container.append(this.prevBtn, this.nextBtn);

    this.prevBtn.onclick = () => this.moveSlide(-1);
    this.nextBtn.onclick = () => this.moveSlide(1);
}

Slidezy.prototype.moveSlide = function(step){
    this.currentIndex = Math.min(Math.max(this.currentIndex + step, 0), this.slide.length - 3);
    
    this.offset = -(this.currentIndex * (100/3));
    this.track.style.transform = `translateX(${this.offset}%)`;
}