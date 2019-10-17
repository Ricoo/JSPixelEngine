#set($abstract = $Abstract)
#set($singleton = $Singleton)

export default class ${NAME} {
    constructor(){
        #if ($abstract == true)
        if (new.target === ${NAME}) {
            throw TypeError("You have to extend this class");
        }
        #else
        #if ($singleton == true)
        if (${NAME}.instance)
            return ${NAME}.instance;
        else
            ${NAME}.instance = this;
        #end
        #end
    }
};