import { Router, Request, Response, request, NextFunction } from 'express';

interface RequestWithBody extends Request {
    body: { [key:string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if(req.session && req.session.loggedIn){
        next();
        return;
    }

    res.status(403);
    res.send("Un-authorized");
};


const router = Router();



router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;


    // console.log("Request", req.body);

    if(email && password && (email ==='arn@gmail.com') && (password==='abc')){

        req.session = {loggedIn: true};
        res.redirect('/');

    } else {
        res.send('Email Property is required');
    }

});

router.get('/', (req: Request , res: Response ) => {


    if( req.session && req.session.loggedIn){

        res.send(`
            <div>
            <div> You are logged in</div>
            <a href="/logout"> Logout </a>
            </div>
        `);
    } else {
        res.send(`
            <div>
            <div> You are not logged in</div>
            <a href="/login"> Login </a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = null;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route User');
});


export { router };