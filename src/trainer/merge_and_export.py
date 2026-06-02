"""
PSC AI-Agent — ادغام LoRA با مدل پایه و export نهایی
پس از Fine-Tuning اجرا کنید
"""
import os, sys, argparse

def merge_and_export(lora_path: str, output_path: str, export_gguf: bool = True):
    from unsloth import FastLanguageModel
    
    print(f"Loading LoRA from: {lora_path}")
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=lora_path, max_seq_length=2048,
        dtype=None, load_in_4bit=True,
    )
    
    # ادغام LoRA با مدل پایه
    print("Merging LoRA weights...")
    model = model.merge_and_unload()
    
    # ذخیره مدل ادغام‌شده
    merged_path = output_path + "_merged"
    model.save_pretrained(merged_path)
    tokenizer.save_pretrained(merged_path)
    print(f"✅ Merged model saved: {merged_path}")
    
    if export_gguf:
        for q_method in ["q4_k_m", "q8_0"]:
            gguf_out = f"{output_path}_{q_method}"
            try:
                model.save_pretrained_gguf(gguf_out, tokenizer, quantization_method=q_method)
                print(f"✅ GGUF {q_method} saved: {gguf_out}")
            except Exception as e:
                print(f"⚠️  GGUF {q_method} failed: {e}")
    
    return merged_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--lora",   required=True,  help="Path to LoRA adapters")
    parser.add_argument("--output", required=True,  help="Output base path")
    parser.add_argument("--no-gguf", action="store_true")
    args = parser.parse_args()
    merge_and_export(args.lora, args.output, not args.no_gguf)
