"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("contact");
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("validation.nameMin")),
        email: z.string().email(t("validation.emailInvalid")),
        phone: z.string().min(6, t("validation.phoneMin")),
        message: z.string().min(10, t("validation.messageMin")),
      }),
    [t]
  );

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = () => {
    setShowSuccess(true);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel space-y-5 rounded-2xl p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          autoComplete="name"
          className="border-[#b98251]/40 bg-white/5 text-white"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-300" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="border-[#b98251]/40 bg-white/5 text-white"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-300" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          className="border-[#b98251]/40 bg-white/5 text-white"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-300" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          rows={5}
          className="border-[#b98251]/40 bg-white/5 text-white"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-red-300" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="gold-shimmer w-full bg-gold-gradient font-semibold text-[#0c1a33] sm:w-auto"
      >
        {t("submit")}
      </Button>
      {showSuccess && (
        <p className="text-sm text-[#ebd190]" role="status">
          {t("success")}
        </p>
      )}
    </form>
  );
}
