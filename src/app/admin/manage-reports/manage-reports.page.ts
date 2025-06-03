import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

interface Report {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'assigned' | 'collected' | 'rejected';
  location: string;
  date: string;
  points: number;
  userId: string;
  userName: string;
  image?: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.page.html',
  styleUrls: ['./manage-reports.page.scss'],
  standalone: false
})
export class ManageReportsPage implements OnInit {
  reports: Report[] = [
    {
      id: '1',
      title: 'Plastic bottles and containers',
      type: 'Plastic',
      status: 'pending',
      location: 'V Section, Umlazi, Durban',
      date: '15 Nov 2023',
      points: 50,
      userId: 'user1',
      userName: 'John Doe',
      image: 'assets/icon/plastic-bottles.png',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Cardboard boxes and newspapers',
      type: 'Paper',
      status: 'assigned',
      location: 'W Section, Umlazi, Durban',
      date: '01 Dec 2023',
      points: 30,
      userId: 'user2',
      userName: 'Jane Smith',
      image: 'assets/icon/boxes.png',
      priority: 'medium',
      assignedTo: 'Collector A'
    },
    {
      id: '3',
      title: 'Glass bottles',
      type: 'Glass',
      status: 'collected',
      location: 'T Section, Umlazi, Durban',
      date: '10 Dec 2023',
      points: 40,
      userId: 'user3',
      userName: 'Mike Johnson',
      image: 'assets/icon/glass.png',
      priority: 'low',
      assignedTo: 'Collector B'
    }
  ];

  filteredReports: Report[] = [];
  pendingCount = 0;
  assignedCount = 0;
  collectedCount = 0;
  filterStatus: string = 'all';
  filterType: string = 'all';
  searchTerm: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.filteredReports = [...this.reports];
    this.updateCounts();
  }

  refreshReports() {
    this.filterReports();
    this.showToast('Reports refreshed');
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => {
      const matchesStatus = this.filterStatus === 'all' || report.status === this.filterStatus;
      const matchesType = this.filterType === 'all' || report.type.toLowerCase() === this.filterType.toLowerCase();
      const matchesSearch = !this.searchTerm || 
        report.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    });
    this.updateCounts();
  }

  updateCounts() {
    this.pendingCount = this.reports.filter(r => r.status === 'pending').length;
    this.assignedCount = this.reports.filter(r => r.status === 'assigned').length;
    this.collectedCount = this.reports.filter(r => r.status === 'collected').length;
  }

  async presentReportActions(report: Report) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Report Actions',
      buttons: [
        {
          text: 'View Details',
          icon: 'eye-outline',
          handler: () => {
            this.viewReportDetails(report.id);
          }
        },
        {
          text: 'Change Status',
          icon: 'swap-horizontal-outline',
          handler: () => {
            this.changeStatus(report);
          }
        },
        {
          text: 'Assign Collector',
          icon: 'person-outline',
          handler: () => {
            this.assignCollector(report);
          }
        },
        {
          text: 'Update Points',
          icon: 'trophy-outline',
          handler: () => {
            this.updatePoints(report);
          }
        },
        {
          text: 'Delete Report',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteReport(report);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  viewReportDetails(reportId: string) {
    this.router.navigate(['/admin/report-details', reportId]);
  }

  async changeStatus(report: Report) {
    const alert = await this.alertController.create({
      header: 'Change Status',
      inputs: [
        {
          name: 'status',
          type: 'radio',
          label: 'Pending',
          value: 'pending',
          checked: report.status === 'pending'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Assigned',
          value: 'assigned',
          checked: report.status === 'assigned'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Collected',
          value: 'collected',
          checked: report.status === 'collected'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Rejected',
          value: 'rejected',
          checked: report.status === 'rejected'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data) {
              report.status = data;
              this.showToast('Status updated successfully');
              this.filterReports();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async assignCollector(report: Report) {
    const alert = await this.alertController.create({
      header: 'Assign Collector',
      inputs: [
        {
          name: 'collector',
          type: 'radio',
          label: 'Collector A',
          value: 'Collector A',
          checked: report.assignedTo === 'Collector A'
        },
        {
          name: 'collector',
          type: 'radio',
          label: 'Collector B',
          value: 'Collector B',
          checked: report.assignedTo === 'Collector B'
        },
        {
          name: 'collector',
          type: 'radio',
          label: 'Collector C',
          value: 'Collector C',
          checked: report.assignedTo === 'Collector C'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Assign',
          handler: (data) => {
            if (data) {
              report.assignedTo = data;
              if (report.status === 'pending') {
                report.status = 'assigned';
              }
              this.showToast('Collector assigned successfully');
              this.filterReports();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async updatePoints(report: Report) {
    const alert = await this.alertController.create({
      header: 'Update Points',
      inputs: [
        {
          name: 'points',
          type: 'number',
          placeholder: 'Enter points',
          value: report.points.toString()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data.points && data.points > 0) {
              report.points = parseInt(data.points);
              this.showToast('Points updated successfully');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteReport(report: Report) {
    const alert = await this.alertController.create({
      header: 'Delete Report',
      message: 'Are you sure you want to delete this report? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            const index = this.reports.findIndex(r => r.id === report.id);
            if (index > -1) {
              this.reports.splice(index, 1);
              this.filterReports();
              this.showToast('Report deleted successfully');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'medium';
      case 'assigned': return 'warning';
      case 'collected': return 'success';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  getTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'plastic': return 'success';
      case 'paper': return 'tertiary';
      case 'glass': return 'primary';
      case 'metal': return 'secondary';
      default: return 'medium';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  }
}