let SoundManager = class SoundManager {
    constructor(soundList) {
        if (SoundManager.instance)
            return SoundManager.instance;
        else
            SoundManager.instance = this;
    }

 // TODO build all soundManager
};

export {SoundManager};