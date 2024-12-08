export class FormValidation {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    // バリデーションルール
    this.rules = {
      name: {
        required: true,
        minLength: 2,
        errorMessage: {
          required: 'お名前を入力してください',
          minLength: 'お名前は2文字以上で入力してください'
        }
      },
      email: {
        required: true,
        email: true,
        errorMessage: {
          required: 'メールアドレスを入力してください',
          email: '正しいメールアドレスの形式で入力してください'
        }
      },
      'inquiry-type': {
        required: true,
        errorMessage: {
          required: 'お問い合わせ種別を選択してください'
        }
      },
      message: {
        required: true,
        minLength: 10,
        errorMessage: {
          required: 'お問い合わせ内容を入力してください',
          minLength: 'お問い合わせ内容は10文字以上で入力してください'
        }
      },
      privacy: {
        required: true,
        errorMessage: {
          required: 'プライバシーポリシーへの同意が必要です'
        }
      }
    };

    this.init();
  }

  init() {
    // フォーム送信時のバリデーション
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateAll()) {
        window.location.href = '/contact/thanks.html';
      }
    });

    // 入力時のバリデーション
    this.form.addEventListener('input', (e) => {
      const field = e.target;
      if (this.rules[field.name]) {
        this.validateField(field);
      }
    });

    // 初期状態で送信ボタンを無効化
    this.submitButton.disabled = true;
  }

  validateAll() {
    let isValid = true;
    Object.keys(this.rules).forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  validateField(field) {
    if (!field || !this.rules[field.name]) return true;

    const rules = this.rules[field.name];
    let isValid = true;
    let errorMessage = '';

    // 必須チェック
    if (rules.required && !field.value.trim()) {
      isValid = false;
      errorMessage = rules.errorMessage.required;
    }
    // 最小文字数チェック
    else if (rules.minLength && field.value.length < rules.minLength) {
      isValid = false;
      errorMessage = rules.errorMessage.minLength;
    }
    // メールアドレス形式チェック
    else if (rules.email && !this.isValidEmail(field.value)) {
      isValid = false;
      errorMessage = rules.errorMessage.email;
    }

    this.setFieldStatus(field, isValid, errorMessage);
    
    // フィールドのバリデーション後に送信ボタンの状態を更新
    this.updateSubmitButton();
    
    return isValid;
  }

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  setFieldStatus(field, isValid, errorMessage = '') {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    if (!errorElement.classList.contains('error-message')) {
      errorElement.classList.add('error-message');
      formGroup.appendChild(errorElement);
    }

    field.classList.toggle('error', !isValid);
    errorElement.textContent = errorMessage;
  }

  updateSubmitButton() {
    // 全フィールドの値が存在し、エラーがない場合のみ送信ボタンを有効化
    const allFieldsFilled = Object.keys(this.rules).every(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      return field.value.trim() !== '' && !field.classList.contains('error');
    });
    
    this.submitButton.disabled = !allFieldsFilled;
  }
}