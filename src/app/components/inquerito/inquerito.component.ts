import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddInqueritoComponent } from '../add-inquerito/add-inquerito.component';
import Swal from 'sweetalert2'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquerito',
  templateUrl: './inquerito.component.html',
  styleUrls: ['./inquerito.component.scss']
})
export class InqueritoComponent implements OnInit {

  inqueritos: any;
  sideBarOpen = true;
  modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  observations: any;
  responsible: any;
  company_farm_cooperative_name: any;
  company_farm_cooperative_nif: any;
  candidate_name: any;
  academic_education_candidate: any;
  continuous_presence_on_farm: any;
  candidate_age: any;
  candidate_age_if_over_sixty_has_childen: any;
  has_children_if_yes: any;
  continuous_presence_on_farm_if_no_estimatepresence: any;
  proposer_main_professional_activity: any;

  candidate_function_on_farm: any;
  identity_card_numer: any;
  phone_number: any;
  permanent_address: any;
  when_farm_had_initial_cycle: any;
  document_to_proves_date: any;
  type_of_farm: any;
  total_farm_surface: any;
  land_ready_for_agriculture: any;
  potentialit_climate: any;

  potentialit_ground: any;
  potentialit_access_to_farm: any;
  potentialit_water_availability: any;
  potentialit_perennial_crops: any;
  evaluation_farm_potential: any;
  explanatory: any;
  surface_crops_201718: any;
  surface_crops_201819: any;
  surface_crops_201920: any;
  surface_crops_total: any;

  volume_crop_production_201718: any;
  volume_crop_production_201819: any;
  volume_crop_production_201920: any;
  volume_crop_production_total: any;
  activities_observations: any;
  number_employees_excluding_owner_women: any;
  number_employees_excluding_owner_men: any;
  staff_quality_assessment: any;
  has_infrastructure: any;
  has_equipment: any;

  financial_income_2018: any;
  financial_income_2019: any;
  financial_income_2020: any;
  financial_income_total: any;
  has_bank_debts: any;
  bank_debts_if_yes_which_bank: any;
  financial_capabilities_to_invest: any;
  assessment_amount_ready_to_invest: any;
  technical_economic_problems_to_farm_1: any;
  technical_economic_problems_to_farm_2: any;

  technical_economic_problems_to_farm_3: any;
  technical_economic_problems_to_farm_4: any;
  how_to_solve_problem_1: any;
  how_to_solve_problem_2: any;
  how_to_solve_problem_3: any;
  how_to_solve_problem_4: any;
  communities_near_the_farm: any;
  comunity_distance: any;
  neighboring_villages_name_1: any;
  neighboring_villages_population_1: any;

  neighboring_villages_name_2: any;
  neighboring_villages_population_2: any;
  neighboring_villages_name_3: any;
  neighboring_villages_population_3: any;
  neighboring_villages_name_4: any;
  neighboring_villages_population_4: any;
  neighboring_villages_name_5: any;
  neighboring_villages_population_5: any;
  neighboring_villages_name_6: any;
  neighboring_villages_population_6: any;

  farm_has_problems_with_neighboring_villages: any;
  which_problems_if_yes: any;
  how_market_products_after_harvest: any;
  main_buyer_name_1: any;
  main_buyer_location_1: any;
  main_buyer_phone_1: any;
  main_buyer_name_2: any;
  main_buyer_location_2: any;
  main_buyer_phone_2: any;
  main_buyer_name_3: any;

  main_buyer_location_3: any;
  main_buyer_phone_3: any;
  costs_incurred_type_1: any;
  costs_incurred_value_1: any;
  costs_incurred_type_2: any;
  costs_incurred_value_2: any;
  costs_incurred_type_3: any;
  costs_incurred_value_3: any;
  costs_incurred_type_4: any;
  costs_incurred_value_4: any;

  in_marketing_what_are_lose_1: any;
  in_marketing_what_are_lose_2: any;
  in_marketing_what_are_lose_3: any;
  in_marketing_what_are_lose_4: any;
  project_value_chain: any;
  has_clear_idea_what_he_wants: any;
  if_yes_clear_idea_project: any;
  if_yes_clear_idea_description: any;
  opinion_project_proposed_complete_and_balanced: any;
  opinion_project_proposed_correct_needs_improve_and_tuned: any;

  opinion_project_proposed_correct_needs_deep_reform: any;
  opinion_project_proposed_out_of_reach: any;
  opinion_project_proposed_unrealistic: any;
  opinion_project_proposed_absurd: any;
  if_no_clear_idea_project: any;
  if_no_clear_idea_description: any;
  created_at: any;
  interest_expression: any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.get_inquireForms();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
  }

  save_inquireForm() {

    let InquireForm = {
      "observations": this.observations,
      "responsible": this.responsible,

      "company_farm_cooperative_name": this.company_farm_cooperative_name,
      "company_farm_cooperative_nif": this.company_farm_cooperative_nif,
      "candidate_name": this.candidate_name,
      "academic_education_candidate": this.academic_education_candidate,
      "continuous_presence_on_farm": this.continuous_presence_on_farm,
      "candidate_age": this.candidate_age,
      "candidate_age_if_over_sixty_has_childen": this.candidate_age_if_over_sixty_has_childen,
      "has_children_if_yes": this.has_children_if_yes,
      "continuous_presence_on_farm_if_no_estimatepresence": this.continuous_presence_on_farm_if_no_estimatepresence,
      "proposer_main_professional_activity": this.proposer_main_professional_activity,

      "candidate_function_on_farm": this.candidate_function_on_farm,
      "identity_card_numer": this.identity_card_numer,
      "phone_number": this.phone_number,
      "permanent_address": this.permanent_address,
      "when_farm_had_initial_cycle": this.when_farm_had_initial_cycle,
      "document_to_proves_date": this.document_to_proves_date,
      "type_of_farm": this.type_of_farm,
      "total_farm_surface": this.total_farm_surface,
      "land_ready_for_agriculture": this.land_ready_for_agriculture,
      "potentialit_climate": this.potentialit_climate,

      "potentialit_ground": this.potentialit_ground,
      "potentialit_access_to_farm": this.potentialit_access_to_farm,
      "potentialit_water_availability": this.potentialit_water_availability,
      "potentialit_perennial_crops": this.potentialit_perennial_crops,
      "evaluation_farm_potential": this.evaluation_farm_potential,
      "explanatory": this.explanatory,
      "surface_crops_201718": this.surface_crops_201718,
      "surface_crops_201819": this.surface_crops_201819,
      "surface_crops_201920": this.surface_crops_201920,
      "surface_crops_total": this.surface_crops_total,

      "volume_crop_production_201718": this.volume_crop_production_201718,
      "volume_crop_production_201819": this.volume_crop_production_201819,
      "volume_crop_production_201920": this.volume_crop_production_201920,
      "volume_crop_production_total": this.volume_crop_production_total,
      "activities_observations": this.activities_observations,
      "number_employees_excluding_owner_women": this.number_employees_excluding_owner_women,
      "number_employees_excluding_owner_men": this.number_employees_excluding_owner_men,
      "staff_quality_assessment": this.staff_quality_assessment,
      "has_infrastructure": this.has_infrastructure,
      "has_equipment": this.has_equipment,

      "financial_income_2018": this.financial_income_2018,
      "financial_income_2019": this.financial_income_2019,
      "financial_income_2020": this.financial_income_2020,
      "financial_income_total": this.financial_income_total,
      "has_bank_debts": this.has_bank_debts,
      "bank_debts_if_yes_which_bank": this.bank_debts_if_yes_which_bank,
      "financial_capabilities_to_invest": this.financial_capabilities_to_invest,
      "assessment_amount_ready_to_invest": this.assessment_amount_ready_to_invest,
      "technical_economic_problems_to_farm_1": this.technical_economic_problems_to_farm_1,
      "technical_economic_problems_to_farm_2": this.technical_economic_problems_to_farm_2,

      "technical_economic_problems_to_farm_3": this.technical_economic_problems_to_farm_3,
      "technical_economic_problems_to_farm_4": this.technical_economic_problems_to_farm_4,
      "how_to_solve_problem_1": this.how_to_solve_problem_1,
      "how_to_solve_problem_2": this.how_to_solve_problem_2,
      "how_to_solve_problem_3": this.how_to_solve_problem_3,
      "how_to_solve_problem_4": this.how_to_solve_problem_4,
      "communities_near_the_farm": this.communities_near_the_farm,
      "comunity_distance": this.comunity_distance,
      "neighboring_villages_name_1": this.neighboring_villages_name_1,
      "neighboring_villages_population_1": this.neighboring_villages_population_1,

      "neighboring_villages_name_2": this.neighboring_villages_name_2,
      "neighboring_villages_population_2": this.neighboring_villages_population_2,
      "neighboring_villages_name_3": this.neighboring_villages_name_3,
      "neighboring_villages_population_3": this.neighboring_villages_population_3,
      "neighboring_villages_name_4": this.neighboring_villages_name_4,
      "neighboring_villages_population_4": this.neighboring_villages_population_4,
      "neighboring_villages_name_5": this.neighboring_villages_name_5,
      "neighboring_villages_population_5": this.neighboring_villages_population_5,
      "neighboring_villages_name_6": this.neighboring_villages_name_6,
      "neighboring_villages_population_6": this.neighboring_villages_population_6,

      "farm_has_problems_with_neighboring_villages": this.farm_has_problems_with_neighboring_villages,
      "which_problems_if_yes": this.which_problems_if_yes,
      "how_market_products_after_harvest": this.how_market_products_after_harvest,
      "main_buyer_name_1": this.main_buyer_name_1,
      "main_buyer_location_1": this.main_buyer_location_1,
      "main_buyer_phone_1": this.main_buyer_phone_1,
      "main_buyer_name_2": this.main_buyer_name_2,
      "main_buyer_location_2": this.main_buyer_location_2,
      "main_buyer_phone_2": this.main_buyer_phone_2,
      "main_buyer_name_3": this.main_buyer_name_3,

      "main_buyer_location_3": this.main_buyer_location_3,
      "main_buyer_phone_3": this.main_buyer_phone_3,
      "costs_incurred_type_1": this.costs_incurred_type_1,
      "costs_incurred_value_1": this.costs_incurred_value_1,
      "costs_incurred_type_2": this.costs_incurred_type_2,
      "costs_incurred_value_2": this.costs_incurred_value_2,
      "costs_incurred_type_3": this.costs_incurred_type_3,
      "costs_incurred_value_3": this.costs_incurred_value_3,
      "costs_incurred_type_4": this.costs_incurred_type_4,
      "costs_incurred_value_4": this.costs_incurred_value_4,

      "in_marketing_what_are_lose_1": this.in_marketing_what_are_lose_1,
      "in_marketing_what_are_lose_2": this.in_marketing_what_are_lose_2,
      "in_marketing_what_are_lose_3": this.in_marketing_what_are_lose_3,
      "in_marketing_what_are_lose_4": this.in_marketing_what_are_lose_4,
      "project_value_chain": this.project_value_chain,
      "has_clear_idea_what_he_wants": this.has_clear_idea_what_he_wants,
      "if_yes_clear_idea_project": this.if_yes_clear_idea_project,
      "if_yes_clear_idea_description": this.if_yes_clear_idea_description,
      "opinion_project_proposed_complete_and_balanced": this.opinion_project_proposed_complete_and_balanced,
      "opinion_project_proposed_correct_needs_improve_and_tuned": this.opinion_project_proposed_correct_needs_improve_and_tuned,

      "opinion_project_proposed_correct_needs_deep_reform": this.opinion_project_proposed_correct_needs_deep_reform,
      "opinion_project_proposed_out_of_reach": this.opinion_project_proposed_out_of_reach,
      "opinion_project_proposed_unrealistic": this.opinion_project_proposed_unrealistic,
      "opinion_project_proposed_absurd": this.opinion_project_proposed_absurd,
      "if_no_clear_idea_project": this.if_no_clear_idea_project,
      "if_no_clear_idea_description": this.if_no_clear_idea_description,
      "created_at": this.created_at,
      "interest_expression": this.interest_expression
    }
    this.dataService.salvaInquireForm(InquireForm).subscribe(
      success => { this.alert_success },
      error => { this.alert_error }
    )
    this.get_inquireForms();
  }

  deleteInquire(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este Inquérito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInquireForm(id).subscribe(
          success => { this.get_inquireForms() },
          error => { this.alert_error() }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success',
        )
      }
    })
  }

  get_inquireForms() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      console.log(data);
    })
  }

  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, tente mais tarde.",
    })
  }
  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }

  goToInquiridor(){
    this.modalRef?.close();
    this.route.navigate(['inquiridor'])
  }

}
