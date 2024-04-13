/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './locale/en.json'
import gujJSON from './locale/guj.json'
import hiJSON from './locale/hi.json'
import teJSON from './locale/te.json'
import mrJSON from './locale/mr.json'
import taJSON from './locale/ta.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next).init({
        resources: {
            en: { ...enJSON },
            guj: { ...gujJSON },
            hi: { ...hiJSON },
            te: { ...teJSON },
            mr: { ...mrJSON },
            ta: { ...taJSON }
        },
    });