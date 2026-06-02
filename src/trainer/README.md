# PSC AI Fine-Tuning — v1.2.0

## فایل‌ها

| فایل | توضیح |
|------|-------|
| `PSC_FineTune_Colab.ipynb` | نوت‌بوک اصلی — در Colab باز کنید |
| `drive_setup.py` | ساخت ساختار Drive قبل از شروع |
| `merge_and_export.py` | ادغام LoRA + export GGUF |
| `PSC_AI_MASTER_v4_optimized.jsonl` | داده‌های آموزشی (275 entries) |

## شروع سریع

### مرحله ۱ — آپلود به Google Drive
```
MyDrive/
  PSC_AI_Agent/
    PSC_FineTune_Colab.ipynb  ← این فایل
    training_data/
      PSC_AI_MASTER_v4_optimized.jsonl  ← این فایل
```

### مرحله ۲ — باز کردن در Colab
1. در Drive روی `PSC_FineTune_Colab.ipynb` دوبار کلیک کنید
2. Runtime → Change runtime type → **T4 GPU**
3. Cells را به ترتیب اجرا کنید

### مرحله ۳ — پیکربندی GPU خودکار
نوت‌بوک به‌طور خودکار GPU را تشخیص می‌دهد:
- **T4** (Free): batch=1, grad_acc=8, epochs=2 (~3-4h)
- **P100** (Pro): batch=2, grad_acc=4, epochs=3 (~2h)
- **A100** (Pro+): batch=4, grad_acc=2, epochs=3 (~45min)

## خروجی در Drive

```
MyDrive/PSC_AI_Agent/
├── models/
│   ├── psc-llama31-8b-lora-YYYYMMDD/      ← LoRA (~80MB)
│   └── psc-llama31-8b-lora-YYYYMMDD-q4/   ← GGUF q4 (~4.5GB)
├── checkpoints/   ← برای resume در صورت قطعی
└── logs/
```

## زمان تخمینی

| GPU | زمان | هزینه |
|-----|------|-------|
| T4 Free | ۳-۴ ساعت | $0 |
| P100 Pro | ۲ ساعت | ~$0.30 |
| A100 Pro+ | ۴۵ دقیقه | ~$0.50 |
