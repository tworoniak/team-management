# 📊 DevFlow Portal v1.0 - Engineering Team Operations Dashboard

DevFlow is a modern SaaS-style engineering dashboard built with React, TypeScript, and Vite.

It is designed for development leads and engineering teams to manage tasks, monitor team workload, visualize sprint-related metrics, and generate skill-based task assignment recommendations.

This project showcases a scalable frontend architecture with shared global state, reusable UI components, interactive data visualization, and an AI-style allocation engine.

---

## Overview

DevFlow is built around the workflow of a development lead who needs visibility into:

- active engineering tasks
- team capacity and workload
- task status distribution
- delivery priorities
- skill alignment
- sprint and project health

The interface uses a sidebar navigation layout with a clean top utility header for a more realistic SaaS dashboard experience.

---

## Screenshots

![DevFlow Portal screen 1.](/client/src/assets/screen-01.png 'DevFlow Portal screen 1.')
![DevFlow Portal screen 2.](/client/src/assets/screen-02.png 'DevFlow Portal screen 2.')
![DevFlow Portal screen 3.](/client/src/assets/screen-03.png 'DevFlow Portal screen 3.')

---

## Core Features

### Dashboard Analytics

- active tasks summary
- team workload overview
- high-priority task count
- task status distribution chart
- priority overview chart
- recent activity feed

### Task Management

- create, edit, and delete tasks
- assign status and priority
- tag tasks
- define required skills
- assign tasks to team members

### Team Management

- create, edit, and delete team members
- set role, availability, and workload
- rate skills across engineering-relevant categories
- visualize team strengths

### AI Allocation Engine

- evaluates backlog tasks against team members
- scores recommendations based on:
- skill match
- availability
- current workload
- role alignment
- task priority
- allows one-click assignment from recommendations

### Interactive Charts

- task status visualization
- task priority visualization
- animated chart updates
- dark-themed custom styling
- custom legends and tooltips

---

## Planned Features

The project is evolving from a general team dashboard into a more development-focused platform.

Planned routes and feature areas include:

### Projects

- project list and detail views
- project health indicators
- project progress tracking
- owner and team assignment
- milestone visibility

### Sprints

- sprint planning and overview
- sprint velocity
- completed vs committed work
- sprint capacity
- blocked work visibility
- burnup or burndown chart

### Additional Enhancements

- local persistence for Zustand state
- authentication
- drag-and-drop workflow
- release planning
- bug vs feature tracking
- team utilization trends

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router

### Styling

- Tailwind CSS
- custom dark SaaS theme
- responsive dashboard layout

### State Management

- Zustand

### Forms and Validation

- React Hook Form
- Zod

### Data Visualization

- Recharts

### Icons

- Lucide React

---
