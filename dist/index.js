"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("./data/data");
function getTruth() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let r = Math.ceil(Math.random() * data_1.truth.length);
            if (data_1.truth[r]) {
                resolve(data_1.truth[r]);
            }
            else {
                resolve(getTruth());
            }
        });
    });
}
function getDare() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let r = Math.ceil(Math.random() * data_1.dare.length);
            if (data_1.dare[r]) {
                resolve(data_1.dare[r]);
            }
            else {
                resolve(getTruth());
            }
        });
    });
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log(req.method + " Connection Called");
    res.status(200).send({
        status: "ok",
        message: "connected",
        data: req.params,
    });
});
app.get("/truth", (req, res) => {
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
app.get("/dare", (req, res) => {
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
