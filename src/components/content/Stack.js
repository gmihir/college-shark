class Stack{
    constructor(initialList){
        this.iteration = [initialList];
    }
    push(item){
        this.iteration.push(item);
    }
    pop(){
        this.iteration = this.iteration.pop();
    }
    peek(){
        return this.iteration[this.iteration.length - 1];
    }
}

export default Stack;