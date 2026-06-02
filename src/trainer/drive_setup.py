"""
PSC AI-Agent — Google Drive Setup Script
اجرا در Colab قبل از notebook اصلی:
  !python drive_setup.py
"""

import os, json, shutil
from pathlib import Path

def setup_drive(drive_base="/content/drive/MyDrive/PSC_AI_Agent"):
    dirs = {
        "data":        f"{drive_base}/training_data",
        "models":      f"{drive_base}/models",
        "checkpoints": f"{drive_base}/checkpoints",
        "logs":        f"{drive_base}/logs",
        "exports":     f"{drive_base}/exports",
    }
    for name, path in dirs.items():
        os.makedirs(path, exist_ok=True)
        print(f"✅ {name:15s} → {path}")

    # config.json
    config = {
        "project":     "PSC AI-Agent",
        "version":     "1.2.0",
        "base_model":  "unsloth/Meta-Llama-3.1-8B-Instruct-bnb-4bit",
        "lora_r":      16,
        "max_seq_len": 2048,
        "epochs":      2,
        "data_file":   "PSC_AI_MASTER_v4_optimized.jsonl",
        "hf_repo":     "",
        "auto_upload": False,
    }
    cfg_path = f"{drive_base}/config.json"
    if not os.path.exists(cfg_path):
        with open(cfg_path, "w") as f:
            json.dump(config, f, ensure_ascii=False, indent=2)
        print(f"\n✅ config.json created: {cfg_path}")
    else:
        print(f"\nℹ️  config.json already exists: {cfg_path}")

    print(f"\n📁 Drive structure ready at:\n   {drive_base}")
    return dirs

if __name__ == "__main__":
    from google.colab import drive
    drive.mount('/content/drive')
    setup_drive()
