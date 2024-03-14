import express, { Request, Response } from "express";
import { truth, dare } from "./data/data";

async function getTruth(): Promise<string> {
    return new Promise((resolve) => {
        let r = Math.ceil(Math.random() * truth.length);
        if (truth[r]) {
            resolve(truth[r]);
        } else {
            resolve(getTruth());
        }
    });
}

async function getDare(): Promise<string> {
    return new Promise((resolve) => {
        let r = Math.ceil(Math.random() * dare.length);
        if (dare[r]) {
            resolve(dare[r]);
        } else {
            resolve(getTruth());
        }
    });
}

const app = express();

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    console.log(req.method + " Connection Called");
    res.status(200).send({
        status: "ok",
        message: "connected",
        data: req.params,
    });
});

app.get("/truth", (req: Request, res: Response) => {
    console.log(req.method + " Truth called");
    getTruth()
        .then((data) => {
            let js = {
                status: "ok",
                truth: data,
            };
            res.status(200).send(js);
        })
        .catch(() => {
            res.status(500).send({
                status: "fucked",
                reson: "server error",
            });
        });

});

app.get("/dare", (req: Request, res: Response) => {
    console.log(req.method + " Dare called");
    getDare()
        .then((data) => {
            let js = {
                status: "ok",
                truth: data,
            };
            res.status(200).send(js);
        })
        .catch(() => {
            res.status(500).send({
                status: "fucked",
                reson: "server error",
            });
        });
});



app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
});
