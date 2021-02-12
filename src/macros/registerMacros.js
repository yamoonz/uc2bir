import React from 'react';
import { AwesomeIcon } from '../components';

export const stepOne = {
	inputs: {
		name: "",
		email: "",
		phone: "",
		password: "",
		type_id: 1, //usertype key st olanın id sini basılacak
		kvkk: 0,
		agreement: 0,
		health_status: 0,
	},
	macro: [
		{
			type: "text",
			required: true,
			name: "name",
			forHtml: "name",
			text: "Ad Soyad",
			icon: AwesomeIcon.User,
		},
		{
			type: "email",
			required: true,
			name: "email",
			forHtml: "email",
			text: "E-mail",
			icon: AwesomeIcon.Envolope,
		},
		{
			type: "text",
			required: true,
			name: "phone",
			forHtml: "phone",
			text: "Telefon (05XXXXXXXXX)",
			icon: AwesomeIcon.Phone,
		},
		{
			type: "password",
			required: true,
			name: "password",
			forHtml: "password",
			text: "Şifre",
			icon: AwesomeIcon.Lock,
		},
		{
			type: "checkbox",
			required: true,
			name: "agreement",
			forHtml: "agreement",
			text: false,
			component: () => <>Üyelik Sözleşmesini ve <a href="/">Ekleri</a> ’ni kabul ediyorum.</>
		},
		{
			type: "checkbox",
			required: true,
			name: "health_status",
			forHtml: "health_status",
			text: false,
			component: () => <>Sağlık muvafakatnamesi <a href="/">okudum</a>, onaylıyorum.</>
		},
		{
			type: "checkbox",
			required: true,
			name: "kvkk",
			forHtml: "kvkk",
			text: false,
			component: () => <>KVKK <a href="/">okudum</a>, onaylıyorum.</>
		},
	]
}

export const stepTwo = {
	inputs: {
		one: "",
		two: "",
		three: "",
		four: "",
		five: "",
		six: "",
	}
}

export const stepThree = {
	inputs: {
		birthday: "",
		genre: "",
		about: "",
		city: "",
		town: "",
		district: "",
		address_detail: "",
	},
	uri: "http://gateway.ms.321.4alabs.com/regions",
	macro: [
		{
			type: "date",
			required: true,
			name: "birthday",
			forHtml: "birthday",
			text: "Doğum Tarihi"
		},
		{
			type: "select",
			required: true,
			name: "genre",
			forHtml: "genre",
			text: "Cinsiyet",
			icon: AwesomeIcon.Gender,
			items: [
				{
					id: 1,
					val: "m",
					name: "Erkek"
				},
				{
					id: 2,
					val: "f",
					name: "Kadın"
				}
			]
		},
		{
			type: "text",
			required: false,
			name: "about",
			forHtml: "about",
			text: "Hakkında",
			icon: AwesomeIcon.AddressCard
		},
	]
}

export const stepFour = {
	inputs: {
		survey_id: 0,
		question_id: 0,
		answer: 0
	},
	macro: [
		{
			type: "radio",
			required: true,
			name: "s1",
			forHtml: "s1",
			text: "1. Kalp rahatsızlığınız var mı?",
			items: [
				{
					id: 1,
					val: "1",
					name: "Evet"
				},
				{
					id: 2,
					val: "0",
					name: "Hayır"
				}
			]
		},
		{
			type: "radio",
			required: true,
			name: "s2",
			forHtml: "s2",
			text: "2. Kalbiniz ya da göğsünüzde sık sık ağrı olur mu?",
			items: [
				{
					id: 1,
					val: "1",
					name: "Evet"
				},
				{
					id: 2,
					val: "0",
					name: "Hayır"
				}
			]
		},
	]
}