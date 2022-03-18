
namespace core
{
    export class Router
    {

        private m_activeLink: string;
        private m_linkData: string;
        private m_routingTable: string[];
        /**
         *@returns {string}
         *
         * @memberof Router
         */
       public get ActiveLink(): string
        {
            return this.m_activeLink;
        }
        
        /**
         *@param {string} link
         *@returns {void}
         */
         public set ActiveLink(link)
        {
            this.m_activeLink = link;
        }

        public get LinkData(): string
        {
            return this.m_linkData;
        }
        
        /**
         *@param {string} link
         *@returns {void}
         */
         public set LinkData(link)
        {
            this.m_linkData = link;
        }
        //constructer

        /**
         * Creates an instance of Router.
         * @constructor
         */
        constructor()
        {
            this.m_activeLink = "";
            this.m_linkData = "";
            this.m_routingTable = new Array<string>();//creates an empthy string container
        }
        //public methods
        /**
         *This method adds a new route to the Routing table
         *
         * @param {string} route
         * @returns {void}
         */
        Add(route: string):void
        {
            this.m_routingTable.push(route);
        }

        /**
         *
         *
         * @param {string[]} routingTable
         * @returns {void}
         */
        AddTable(routingTable: string[]): void
        {
            this.m_routingTable = routingTable;
        }

        /**
         * This method finds and returns 
         *
         * @param {string} route
         * @return {number} 
         * @memberof Router
         */
        Find(route: string): number
        {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route was successfully removed,
         * otherwise, it returns false
         * @param {string} route
         * @return {boolean} 
         */
        Remove(route: string):boolean
        {
            if(this.Find(route) > -1)
            {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }
        //public override methods
        /**
         * This method overides the built in tostring method and returns the routing table as a coma separated string.
         * 
         * @override
         * @returns {string}
         */
        toString():string
        {
            return this.m_routingTable.toString();
        }

    }

}



let router: core.Router = new core.Router();

router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/projects",
    "/login",
    "/register",
    "/edit"
]);

let route:string = location.pathname; //alias for location .pathname

if(router.Find(route) > -1)
{
    router.ActiveLink = (route == "/") ? "home" : route.substring(1);
}
else
{
    router.ActiveLink = "404";
}

router.ActiveLink = (router.Find(route) > -1) ?  router.ActiveLink = (route == "/") ? "home" : route.substring(1) :"404";

//