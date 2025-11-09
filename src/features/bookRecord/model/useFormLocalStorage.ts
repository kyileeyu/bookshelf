import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * 폼 값을 localStorage에 자동 저장 / 복원한다
 * @param key   localStorage 키
 * @param form  RHF methods 객체 (useForm 반환값)
 * @param debounce   저장 주기(ms) - 너무 잦은 저장 방지용
 */
export function useFormLocalStorage<T>(
  key: string,
  form: UseFormReturn<T>,
  debounce = 500,
) {
  const { watch, reset } = form;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(key);
    if (saved) reset(JSON.parse(saved) as T, { keepDefaultValues: true });
  }, [key, reset]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const subscription = watch(
      (() => {
        let timer: NodeJS.Timeout | null = null;
        return (value) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value));
          }, debounce);
        };
      })(),
    );
    return () => subscription.unsubscribe();
  }, [key, watch, debounce]);
}
