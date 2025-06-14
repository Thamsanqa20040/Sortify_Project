import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface WasteType {
  type: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false,
})
export class ReportPage implements OnInit {
  @ViewChild('particlesContainer', { static: false }) particlesContainer!: ElementRef;

  wasteTypes: WasteType[] = [
    { type: 'Plastic', label: 'Plastic', icon: '🥤' },
    { type: 'Paper', label: 'Paper', icon: '📄' },
    { type: 'Glass', label: 'Glass', icon: '🍶' },
    { type: 'Metal', label: 'Metal', icon: '🥫' },
    { type: 'E-Waste', label: 'E-Waste', icon: '📱' },
    { type: 'Organic', label: 'Organic', icon: '🍌' },
    { type: 'Hazardous', label: 'Hazardous', icon: '⚠️' },
    { type: 'Other', label: 'Other', icon: '❓' }
  ];

  selectedWasteType: string | null = null;
  description: string = '';
  isLoading: boolean = false;
  location: any = { lat: 0, lng: 0 };
  currentProgress: number = 33;
  characterCount: number = 0;
  maxCharacters: number = 500;
  showSuccessMessage: boolean = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Initialize location (dummy for now)
    this.location = { lat: 0, lng: 0 };
    
    // Create particles after view init
    setTimeout(() => {
      this.createParticles();
    }, 100);
  }

  // Initialize floating particles
  createParticles() {
    if (!this.particlesContainer) return;
    
    const particlesContainer = this.particlesContainer.nativeElement;
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'particle');
      
      const size = Math.random() * 4 + 2 + 'px';
      this.renderer.setStyle(particle, 'width', size);
      this.renderer.setStyle(particle, 'height', size);
      this.renderer.setStyle(particle, 'left', Math.random() * 100 + '%');
      this.renderer.setStyle(particle, 'top', Math.random() * 100 + '%');
      this.renderer.setStyle(particle, 'animation-delay', Math.random() * 6 + 's');
      this.renderer.setStyle(particle, 'animation-duration', (Math.random() * 3 + 3) + 's');
      
      this.renderer.appendChild(particlesContainer, particle);
    }
  }

  // Select waste type
  selectWasteType(type: string) {
    this.selectedWasteType = type;
    this.updateProgress(66);
  }

  // Handle description input
  onDescriptionChange() {
    this.characterCount = this.description.length;
    
    if (this.description.length > 0 && this.selectedWasteType) {
      this.updateProgress(100);
    } else if (this.selectedWasteType) {
      this.updateProgress(66);
    }
  }

  // Update progress bar
  updateProgress(width: number) {
    this.currentProgress = width;
  }

  // Get progress step text
  getProgressStepText(): string {
    if (this.currentProgress <= 33) {
      return 'Step 1 of 3';
    } else if (this.currentProgress <= 66) {
      return 'Step 2 of 3';
    } else {
      return 'Step 3 of 3';
    }
  }

  // Upload photo
  async uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: any) => {
      if (e.target.files.length > 0) {
        this.updateProgress(100);
        this.showNotification('📸 Photo uploaded successfully!');
      }
    };
    
    input.click();
  }

  // Take photo
  async takePhoto() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Or use .Uri if you want a path
      source: CameraSource.Camera
    });

    // You can now use image.base64String or image.webPath
    console.log('Photo taken:', image);
    this.showNotification('✅ Photo taken successfully!');
    this.updateProgress(100);
    
    // Example: convert to data URL
    const photoDataUrl = `data:image/jpeg;base64,${image.base64String}`;
    // You can display it or upload it

  } catch (error) {
    console.error('Camera error:', error);
    this.showNotification('❌ Failed to take photo');
  }
}

  // Submit report
  async submitReport() {
    if (!this.selectedWasteType) {
      this.showNotification('⚠️ Please select a waste type first');
      return;
    }

    // Show loading
    this.isLoading = true;

    // Create loading overlay
    const loading = await this.loadingController.create({
      message: 'Submitting your report...',
      duration: 2000,
      spinner: 'dots'
    });

    await loading.present();

    // Simulate API call
    setTimeout(async () => {
      this.isLoading = false;
      await loading.dismiss();
      
      // Show success message
      this.showSuccessMessage = true;
      this.showNotification('✨ Report submitted successfully! You earned 15 points! 🎉');
      
      // Reset form after success
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }, 2000);
  }

  // Reset form
  resetForm() {
    this.selectedWasteType = null;
    this.description = '';
    this.characterCount = 0;
    this.showSuccessMessage = false;
    this.currentProgress = 33;
  }

  // Show notification toast
  async showNotification(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: '✕',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  // Check if waste type is selected
  isWasteTypeSelected(type: string): boolean {
    return this.selectedWasteType === type;
  }

  // Get character count color
  getCharacterCountColor(): string {
    return this.characterCount > 450 ? '#ff6b6b' : 'rgba(255, 255, 255, 0.6)';
  }
}